const CircularProgressBar = (props) => {
    const { size, strokeWidth, percentage, color } = props
    const viewBox = `0 0 ${size} ${size}`
    const radius = (size - strokeWidth) / 2
    const circumference = radius * Math.PI * 2
    const dash = (percentage * circumference) / 100

    return (
        <svg width={size} height={size} viewBox={viewBox}>
            {/* circle for empty  */}
            <circle
                fill="none"
                stroke="#ccc"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
            />
            {/* circle for actual progressbar */}
            <circle
                fill="none"
                stroke={color}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                strokeDasharray={[dash, circumference - dash]}
                strokeLinecap="round"
            />
        </svg>
    )

}
export default CircularProgressBar