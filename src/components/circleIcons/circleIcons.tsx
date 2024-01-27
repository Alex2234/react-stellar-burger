import styles from "./circleIcons.module.css";

type TCircleIcons = {
  icons: string[];
}

const CircleIcons = ({ icons }: TCircleIcons) => {
    const maxIcons = 5;
  
    const displayedIcons = icons.slice(0, maxIcons);
    const extraIconsCount = icons.length > maxIcons ? icons.length - maxIcons : 0;
  
    return (
      <div className={styles.iconsContainer}>
        {displayedIcons.map((icon, index) => (
          <div key={index} className={styles.circle}>
            <img className={styles.icon} src={icon} alt="icon" />
            {index === maxIcons - 1 && extraIconsCount > 0 && (
              <>
                <div className={styles.overlay}></div>
                <p className={`${styles.iconText} text text_type_digits-default`}>
                  +{extraIconsCount}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  export default CircleIcons;