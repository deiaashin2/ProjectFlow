import moonIcon from "@/assets/moon.png";
import sunIcon from "@/assets/sun.png";
import dawnIcon from "@/assets/dawn.png";

type TimeOfDay = "morning" | "afternoon" | "night";

const items = {
  morning: {
    title: "Good Morning",
    icon: dawnIcon,
    alt: "Icon of cloud and sun",
  },
  afternoon: {
    title: "Good Afternoon",
    icon: sunIcon,
    alt: "Icon of the sun",
  },
  night: {
    title: "Good Evening",
    icon: moonIcon,
    alt: "Icon of the moon",
  },
};

function TimeOfDayHeader({
  className,
  ...props
}: {
  className?: React.HTMLAttributes<HTMLImageElement>;
}) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let timeOfDay: TimeOfDay;
  if (currentHour >= 5 && currentHour < 12) {
    timeOfDay = "morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "night";
  }

  const { title, icon, alt } = items[timeOfDay];
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        className={`${timeOfDay === "night" ? "size-7" : "size-8"}`}
        src={icon}
        alt={alt}
        {...props}
      />
      <span className="text-2xl font-semibold">{title}, User</span>
    </div>
  );
}

export default TimeOfDayHeader;
