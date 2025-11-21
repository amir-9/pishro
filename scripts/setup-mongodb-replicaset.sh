#!/bin/bash

# راهنمای تنظیم MongoDB به عنوان Replica Set
# این اسکریپت MongoDB standalone را به single-node replica set تبدیل می‌کند

echo "🔧 تنظیم MongoDB Replica Set"
echo "================================"

# 1. متوقف کردن MongoDB
echo "1. متوقف کردن MongoDB..."
sudo systemctl stop mongod

# 2. ویرایش فایل پیکربندی MongoDB
echo "2. ویرایش فایل پیکربندی..."
MONGO_CONF="/etc/mongod.conf"

# پشتیبان‌گیری از فایل پیکربندی فعلی
sudo cp $MONGO_CONF ${MONGO_CONF}.backup

# اضافه کردن تنظیمات replica set
echo "
# Replica Set Configuration
replication:
  replSetName: \"rs0\"
" | sudo tee -a $MONGO_CONF

echo "✅ تنظیمات replica set اضافه شد"

# 3. راه‌اندازی MongoDB
echo "3. راه‌اندازی MongoDB..."
sudo systemctl start mongod

# صبر برای شروع کامل MongoDB
echo "صبر برای شروع MongoDB..."
sleep 5

# 4. بررسی وضعیت MongoDB
if ! sudo systemctl is-active --quiet mongod; then
    echo "❌ خطا: MongoDB شروع نشد"
    echo "لطفا logs را بررسی کنید: sudo journalctl -u mongod -n 50"
    exit 1
fi

echo "✅ MongoDB شروع شد"

# 5. راه‌اندازی replica set
echo "4. راه‌اندازی replica set..."

# ساخت اسکریپت موقت برای mongosh
cat > /tmp/init-replicaset.js << 'EOF'
try {
    const result = rs.initiate({
        _id: "rs0",
        members: [{ _id: 0, host: "localhost:27017" }]
    });
    print("✅ Replica set initialized successfully");
    print(JSON.stringify(result, null, 2));
} catch (error) {
    if (error.codeName === "AlreadyInitialized") {
        print("⚠️  Replica set already initialized");
    } else {
        print("❌ Error initializing replica set:");
        print(error);
    }
}
EOF

# اجرای اسکریپت
mongosh --quiet < /tmp/init-replicaset.js

# پاک کردن فایل موقت
rm /tmp/init-replicaset.js

# 6. صبر برای آماده شدن replica set
echo "5. صبر برای آماده شدن replica set..."
sleep 3

# 7. بررسی وضعیت replica set
echo "6. بررسی وضعیت replica set..."
mongosh --quiet --eval "rs.status()" > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Replica set به درستی تنظیم شد"
    echo ""
    echo "📝 اطلاعات مهم:"
    echo "  - نام Replica Set: rs0"
    echo "  - Member: localhost:27017"
    echo ""
    echo "🔗 Connection String جدید:"
    echo "  mongodb://username:password@localhost:27017/dbname?replicaSet=rs0"
    echo ""
    echo "⚠️  مهم: فایل .env را بروزرسانی کنید:"
    echo "  DATABASE_URL=\"mongodb://pishro_user:your-password@localhost:27017/pishro?replicaSet=rs0\""
else
    echo "⚠️  خطا در بررسی وضعیت replica set"
    echo "لطفا دستی بررسی کنید: mongosh --eval 'rs.status()'"
fi

echo ""
echo "✅ تنظیمات کامل شد!"
echo ""
echo "📌 مراحل بعدی:"
echo "  1. فایل .env را بروزرسانی کنید (اضافه کردن ?replicaSet=rs0)"
echo "  2. MongoDB را restart کنید: sudo systemctl restart mongod"
echo "  3. Prisma را test کنید: npx prisma db push"
