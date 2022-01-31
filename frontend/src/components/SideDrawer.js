import './SideDrawer.css';

const SideDrawer = ({show, click}) => {
    const SideDrawerClass = ["sidedrawer"];

    if (show) {
        SideDrawerClass.push("show");
    }
  return  <div className={SideDrawerClass.join(" ")}></div>;
};

export default SideDrawer;
