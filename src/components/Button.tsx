type ButtonPropsType = {
    title: string,
    onClick?: () => void
    className?: string
};
export const Button = ({title, onClick, className}: ButtonPropsType) => {

    const onClickHandler = () => onClick && onClick()

    return (
        <button className={className} onClick={onClickHandler}>
            {title}
        </button>
    );
};