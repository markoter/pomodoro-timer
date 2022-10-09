import { useEffect, useState } from "react"

const CircularProgressBar = (props) => {
    const { size, strokeWidth, percentage, color, time } = props
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        setProgress(percentage)
    }, [percentage])

    const viewBox = `0 0 ${size} ${size}`
    const radius = (size - strokeWidth) / 2
    const circumference = radius * Math.PI * 2
    const dash = (progress * circumference) / 100

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
                style={{ transition: "all 5s" }}
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
                {time}
            </text>
        </svg>
    )

}
export default CircularProgressBar

//from https://medium.com/tinyso/how-to-create-an-animated-svg-circular-progress-component-in-react-5123c7d24391