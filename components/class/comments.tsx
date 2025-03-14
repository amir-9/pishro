import Image from "next/image";
import { MdOutlineComment } from "react-icons/md"; // icon for comment
// اگر لینک به کامنت یا سایر بخش‌ها نیاز دارید، می‌توانید Link از next/link رو هم وارد کنید.

export const commentsData = [
  {
    name: "نام خریدار",
    message:
      "پاسخ میتونه ولی بدون محدودیت درج بشه، به همین خاطر محدودیت تعداد کاراکتر در پاسخ ها وجود نداره؛ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد ",
    data: "1404/1/13",
    profile: "/images/profile/Avatar-24-24.png",
    reply: {},
  },
  {
    name: "نام خریدار",
    message:
      "پاسخ میتونه ولی بدون محدودیت درج بشه، به همین خاطر محدودیت تعداد کاراکتر در پاسخ ها وجود نداره؛ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد ",
    data: "1404/1/13",
    profile: "/images/profile/Avatar-24-24.png",
    reply: {
      name: "نام خریدار",
      message:
        "پاسخ میتونه ولی بدون محدودیت درج بشه، به همین خاطر محدودیت تعداد کاراکتر در پاسخ ها وجود نداره؛ لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد ",
      data: "1404/1/13",
      profile: "/images/profile/Avatar-24-24.png",
      reply: {},
    },
  },
];

const CommentsSection = () => {
  return (
    <div className="mt-20 border-t">
      {/* Add Comment Form */}
      <form className="max-w-4xl w-full">
        {/* Form Header */}
        <div className="border-b">
          <h5 className="mt-8 mb-4 flex gap-3 items-center">
            <MdOutlineComment className="text-gray-600 text-xl" />
            دیدگاه خود را درج کنید
          </h5>
        </div>
        {/* Username Field */}
        <div className="py-3 px-5 mt-5 mb-2 flex items-center gap-2">
          <p className="text-sm">نام کاربری اینجا درج میشود</p>
        </div>
        {/* Comment Field */}
        <div className="bg-[#fafafa] py-3 px-5 mb-2 flex items-center gap-2">
          <textarea
            name="comment-msg"
            id="comment-msg"
            placeholder="دیدگاه خود را درج کنید..."
            className="flex-1 bg-transparent outline-none text-sm min-h-20 resize-none"
          ></textarea>
        </div>
        <button className="w-full text-white bg-[#214254] py-2 text-sm font-medium">
          افزودن دیدگاه
        </button>
      </form>

      {/* Show Comments Section */}
      <div className="mt-10 max-w-4xl">
        {commentsData.map((comment, index) => (
          <div key={index} className="flex items-start space-x-4 border-b py-4">
            {/* Profile Image */}
            <div className="relative w-6 h-6">
              <Image
                src={comment.profile}
                alt={`${comment.name} profile`}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              {/* Comment Header: Username and Date */}
              <div className="flex items-center gap-2">
                <span className="font-semibold">{comment.name}</span>
                <span className="text-xs text-gray-400">{comment.data}</span>
              </div>
              {/* Comment Message */}
              <div className="flex items-start gap-2 mt-2">
                <MdOutlineComment className="text-gray-500" />
                <p className="text-sm text-gray-700">{comment.message}</p>
              </div>
              {/* Reply Section (if exists) */}
              {comment.reply && comment.reply.message && (
                <div className="mt-2 ml-8 border-l pl-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{comment.reply.name}</span>
                    <span className="text-xs text-gray-400">
                      {comment.reply.data}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 mt-1">
                    <MdOutlineComment className="text-gray-500" />
                    <p className="text-sm text-gray-700">
                      {comment.reply.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
