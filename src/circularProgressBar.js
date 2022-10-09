const CircularProgressBar = (props) => {
    const { size, strokeWidth, color, timer, timerFull, showTime } = props
  
    const viewBox = `0 0 ${size} ${size}`
    const radius = (size - strokeWidth) / 2
    const circumference = radius * Math.PI * 2
    const dash = ((timerFull - timer) * circumference) / timerFull

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
            <text
                id="time-left"
                fill="black"
                fontSize="40px"
                x="50%"
                y="50%"
                dy="20px"
                textAnchor="middle"
            >
                {showTime(timer)}
            </text>
            
        </svg>
    )

}
export default CircularProgressBar

//based on https://medium.com/tinyso/how-to-create-an-animated-svg-circular-progress-component-in-react-5123c7d24391