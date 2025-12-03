import clsx from 'clsx';
import styles from './styles.module.css';

interface Props {
    value: number;
    speed: number;
}

const Dial = (props: Props) => {
    const { value, speed } = props;
    const angle = (value / 100) * 360;
    return (
        <div className={clsx(styles.dial)}>
            {value}
            <div className={clsx(styles.pointer)} style={{
                transitionDuration: `${speed}ms`,
                transform: `rotate(${angle}deg)`,
            }} />
        </div>
    );
};

export default Dial;