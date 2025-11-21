# 🔧 رفع خطای آپلود تصویر - MongoDB Replica Set

## 🔴 مشکل
هنگام آپلود تصویر خطای زیر رخ می‌دهد:
```
Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set.
```

## 💡 دلیل
MongoDB به صورت **standalone** اجرا می‌شود، اما Prisma برای برخی عملیات (مانند ایجاد رکورد با relation) به **transaction** نیاز دارد که فقط در **replica set** پشتیبانی می‌شود.

## ✅ راه‌حل

### روش 1: تنظیم Single-Node Replica Set (توصیه می‌شود)

این روش MongoDB standalone شما را به یک replica set تک‌نودی تبدیل می‌کند (بدون نیاز به سرور اضافی).

#### مرحله 1: اتصال به سرور

```bash
# SSH به سرور MongoDB
ssh your-user@your-server-ip
```

#### مرحله 2: تنظیم MongoDB

```bash
# 1. متوقف کردن MongoDB
sudo systemctl stop mongod

# 2. پشتیبان‌گیری از فایل پیکربندی
sudo cp /etc/mongod.conf /etc/mongod.conf.backup

# 3. ویرایش فایل پیکربندی
sudo nano /etc/mongod.conf
```

در انتهای فایل، این خطوط را اضافه کنید:

```yaml
# Replica Set Configuration
replication:
  replSetName: "rs0"
```

ذخیره کنید (Ctrl+O، Enter، Ctrl+X)

```bash
# 4. راه‌اندازی مجدد MongoDB
sudo systemctl start mongod

# 5. بررسی وضعیت
sudo systemctl status mongod
```

#### مرحله 3: راه‌اندازی Replica Set

```bash
# اتصال به MongoDB shell
mongosh -u admin -p --authenticationDatabase admin

# در MongoDB shell، این دستورات را اجرا کنید:
```

```javascript
rs.initiate({
  _id: "rs0",
  members: [{ _id: 0, host: "localhost:27017" }]
})

// بررسی وضعیت
rs.status()

// خروج
exit
```

اگر خطای "AlreadyInitialized" گرفتید، نگران نباشید - یعنی قبلاً راه‌اندازی شده.

#### مرحله 4: بروزرسانی Connection String در سرور اپلیکیشن

در سرور Next.js، فایل `.env` را ویرایش کنید:

```bash
# اگر در همان سرور MongoDB هستید
nano .env

# یا اگر از Docker استفاده می‌کنید
nano .env.production
```

Connection string قبلی:
```env
DATABASE_URL="mongodb://pishro_user:password@localhost:27017/pishro"
```

Connection string جدید (اضافه شدن `?replicaSet=rs0`):
```env
DATABASE_URL="mongodb://pishro_user:password@localhost:27017/pishro?replicaSet=rs0"
```

**⚠️ مهم:** اگر از IP خارجی استفاده می‌کنید، `localhost` را با IP سرور جایگزین کنید:
```env
DATABASE_URL="mongodb://pishro_user:password@YOUR_SERVER_IP:27017/pishro?replicaSet=rs0"
```

#### مرحله 5: Restart اپلیکیشن Next.js

```bash
# اگر با PM2 اجرا می‌شود:
pm2 restart pishro

# اگر با Docker اجرا می‌شود:
docker-compose down && docker-compose up -d

# اگر با systemd اجرا می‌شود:
sudo systemctl restart pishro
```

#### مرحله 6: تست

```bash
# تست Prisma
npx prisma db push

# یا اتصال به MongoDB
mongosh "mongodb://pishro_user:password@localhost:27017/pishro?replicaSet=rs0"
```

---

### روش 2: استفاده از اسکریپت خودکار

اگر دسترسی root دارید، می‌توانید اسکریپت آماده را اجرا کنید:

```bash
# کپی اسکریپت به سرور
scp scripts/setup-mongodb-replicaset.sh your-user@your-server:/tmp/

# اجرای اسکریپت در سرور
ssh your-user@your-server
chmod +x /tmp/setup-mongodb-replicaset.sh
sudo /tmp/setup-mongodb-replicaset.sh
```

---

## 🧪 تست نهایی

پس از انجام تنظیمات، از داشبورد ادمین دوباره سعی کنید تصویر آپلود کنید.

### اگر باز هم خطا داد:

1. بررسی logs MongoDB:
```bash
sudo tail -f /var/log/mongodb/mongod.log
```

2. بررسی وضعیت replica set:
```bash
mongosh -u admin -p --authenticationDatabase admin --eval "rs.status()"
```

3. بررسی connection string در .env:
```bash
cat .env | grep DATABASE_URL
```

4. بررسی logs Next.js:
```bash
pm2 logs pishro
# یا
docker-compose logs -f pishro
```

---

## 📝 نکات مهم

1. **Backup قبل از تغییر**: همیشه قبل از تغییر در MongoDB، backup بگیرید
2. **Development vs Production**: این تنظیمات برای single-node است و برای production کوچک مناسب است
3. **Performance**: تبدیل به replica set تأثیر کمی روی performance دارد
4. **امنیت**: اطمینان حاصل کنید که MongoDB شما authentication دارد

---

## 🆘 عیب‌یابی

### خطا: "replSetName does not match"
- Connection string را بررسی کنید
- در `/etc/mongod.conf` مطمئن شوید `replSetName: "rs0"` درست نوشته شده

### خطا: "No replica set config found"
- دستور `rs.initiate()` را دوباره در mongosh اجرا کنید

### خطا: "MongoNetworkError"
- بررسی کنید MongoDB روی port 27017 در حال اجرا است: `sudo netstat -tulpn | grep 27017`
- Firewall را بررسی کنید: `sudo ufw status`

---

## ✅ چک‌لیست

- [ ] MongoDB به replica set تبدیل شد
- [ ] `rs.status()` وضعیت سالم نشان می‌دهد
- [ ] Connection string در .env بروزرسانی شد (`?replicaSet=rs0` اضافه شده)
- [ ] اپلیکیشن Next.js restart شد
- [ ] آپلود تصویر کار می‌کند

---

**موفق باشید! 🚀**
