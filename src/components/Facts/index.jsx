import styles from './RandomFacts.module.scss';

const RandomFacts = (props) => {
    const data = props.data;

    return (
        <div className={styles.wrapper}>
            <h2>Random Fact</h2>
            <p>{data.text}</p>
        </div>
    );
};

export default RandomFacts;