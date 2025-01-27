interface PriceProps {
  price: number; // قیمت ورودی از نوع عدد
  monthly?: boolean; // حالت ماهانه (اختیاری)
}

const Price = ({ price, monthly = false }: PriceProps) => {
  return (
    <div className="text-gray-500 text-sm font-medium">
      {monthly ? "ماهانه از " : ""}
      <span className="text-black font-bold">
        {price.toLocaleString("fa-IR")}
      </span>{" "}
      تومان
    </div>
  );
};

export default Price;
