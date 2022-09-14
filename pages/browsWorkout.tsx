import BrowserWorkout from "../components/BrowserWorkout";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Browse Workouts", href: "#", icon: UsersIcon, current: false },
    // { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Progress", href: "#", icon: InboxIcon, current: false },
    // { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const BrowsWorkout = () => {
  return (
    <>
      <Layout>
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl text-center font-semibold text-gray-900">
              Browse our carefully curated exercises
            </h1>
            <p className="text-center text-gray-300">
              Thoughtfully designed exercises meant to push you to the absolute
              limits
            </p>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            {/* Replace with your content */}
            <BrowserWorkout />
            {/* /End replace */}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default BrowsWorkout;
