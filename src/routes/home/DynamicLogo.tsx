import { FC, useState, useEffect } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { motion, easeOut } from 'motion/react'

interface DynamicLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
  numberOfLines?: number
  startRadius?: number // Margin from centre point (start of the line)
  minEndRadius?: number // Minimum line length (end of the line from centre)
  maxEndRadius?: number // Maximum line length (end of the line from centre)
  duration?: number
  staggerDelay?: number
  strokeWidth?: number
  strokeColour?: string
  rotationSpeed?: number
  maxLineGaps?: number
  lineGapWidth?: number
}

// Define a type for a segment of a line
type LineSegment = {
  x1: number
  y1: number
  x2: number
  y2: number
}

export const DynamicLogo: FC<DynamicLogoProps> = ({
  numberOfLines = 12,
  startRadius = 150,
  minEndRadius = 275,
  maxEndRadius = 400,
  duration = 1,
  staggerDelay = 0.05,
  strokeWidth = 3,
  strokeColour = '#c3ecce',
  rotationSpeed = 0.1,
  maxLineGaps = 2,
  lineGapWidth = 12,
  className,
  ...props
}) => {
  const [linesSegments, setLinesSegments] = useState<LineSegment[][]>([])

  // Calculate SVG dimensions based on the maximum extent needed for the lines
  // This ensures the SVG is large enough to contain all lines and the rotation doesn't clip them
  const maxDimension = maxEndRadius + strokeWidth // Max extent from the calculated centre
  const svgWidth = maxDimension * 2
  const svgHeight = maxDimension * 2

  // Calculate cx and cy dynamically to be the true centre of the SVG viewBox
  const cx = svgWidth / 2
  const cy = svgHeight / 2

  useEffect(() => {
    const allLinesSegments: LineSegment[][] = []

    for (let i = 0; i < numberOfLines; i++) {
      const angle = (i / numberOfLines) * 2 * Math.PI // Angle in radians

      const randomEndRadius = minEndRadius + Math.random() * (maxEndRadius - minEndRadius)
      const totalLineLength = randomEndRadius - startRadius

      // Determine a random number of breaks for this line (0, 1, or 2)
      const numberOfBreaks = Math.floor(Math.random() * (maxLineGaps + 1))
      const numberOfSegments = numberOfBreaks + 1 // 0 breaks = 1 segment, 1 break = 2 segments, etc.
      const totalGapSpace = numberOfBreaks * lineGapWidth

      const segmentsForThisLine: LineSegment[] = []

      // Calculate the available length for segments after accounting for gaps
      let availableSegmentLength = totalLineLength - totalGapSpace

      // Ensure availableSegmentLength is not negative (if gaps are too wide)
      if (availableSegmentLength < 0) {
        availableSegmentLength = 0
        // Optionally, you might want to adjust fixedGapWidth or maxEndRadius
        // or ensure that lines with too many breaks become zero length.
      }

      // Distribute the available length equally among the segments
      const segmentBaseLength = numberOfSegments > 0 ? availableSegmentLength / numberOfSegments : 0

      let currentRadialStart = startRadius

      for (let j = 0; j < numberOfSegments; j++) {
        // Only draw a segment if it has a positive length
        if (segmentBaseLength > 0.01) {
          // Small threshold to avoid tiny invisible segments
          const segmentStartX = cx + currentRadialStart * Math.cos(angle)
          const segmentStartY = cy + currentRadialStart * Math.sin(angle)

          const segmentEndRadial = currentRadialStart + segmentBaseLength
          const segmentEndX = cx + segmentEndRadial * Math.cos(angle)
          const segmentEndY = cy + segmentEndRadial * Math.sin(angle)

          segmentsForThisLine.push({
            x1: segmentStartX,
            y1: segmentStartY,
            x2: segmentEndX,
            y2: segmentEndY
          })

          // Move current start past the segment and then add the fixed gap
          currentRadialStart = segmentEndRadial
        }
        // Add gap after segment, but not after the very last segment
        if (j < numberOfBreaks) {
          // Only add gap if there's another segment coming
          currentRadialStart += lineGapWidth
        }
      }

      allLinesSegments.push(segmentsForThisLine)
    }
    setLinesSegments(allLinesSegments)
  }, [numberOfLines, startRadius, minEndRadius, maxEndRadius, cx, cy, maxLineGaps, lineGapWidth])

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: duration, ease: easeOut }
    }
  }

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  }

  const transitionDuration = 10 / rotationSpeed

  return (
    <div className={twClassMerge(className)} {...props}>
      <motion.svg
        key={rotationSpeed}
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: 360 }}
        transition={{ duration: transitionDuration, repeat: Infinity, ease: 'linear' }}
        variants={containerVariants}
        // Set transform-origin to the centre of the SVG for correct rotation
        style={{ transformOrigin: `${cx}px ${cy}px`, overflow: 'visible' }}
      >
        {linesSegments.map((segments, lineIndex) => (
          // Use a Fragment or group for each "logical" line so staggerChildren works on the first level
          // and each segment within that line can also animate
          <motion.g key={lineIndex}>
            {segments.map((segment, segmentIndex) => (
              <motion.line
                key={`${lineIndex}-${segmentIndex}`} // Unique key for each segment
                x1={segment.x1}
                y1={segment.y1}
                x2={segment.x2}
                y2={segment.y2}
                stroke={strokeColour}
                strokeWidth={strokeWidth}
                variants={lineVariants}
              />
            ))}
          </motion.g>
        ))}
      </motion.svg>
    </div>
  )
}
