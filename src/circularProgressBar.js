const CircularProgressBar = (props) => {
    const { size, strokeWidth } = props
    const viewBox = `0 0 ${size} ${size}`
    const radius = (size - strokeWidth) / 2

    return (
        <svg width={size} height={size} viewBox={viewBox}>
            <circle
                fill="none"
                stroke="#ccc"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
            />
        </svg>
    )

}
export default CircularProgressBar