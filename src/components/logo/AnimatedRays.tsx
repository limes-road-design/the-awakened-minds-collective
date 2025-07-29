import { FC, useState, useEffect } from 'react'
import { twClassMerge } from '~/utils/tailwind'
import { motion, easeOut } from 'motion/react'

interface AnimatedRaysProps extends React.HTMLAttributes<HTMLDivElement> {
  // Custom props go here
  rayCount?: number
  startRadius?: number // Margin from centre point (start of the line)
  minEndRadius?: number // Minimum line length (end of the line from centre)
  maxEndRadius?: number // Maximum line length (end of the line from centre)
  duration?: number
  staggerDelay?: number
  rayWidth?: number
  rayColor?: string
  rotationSpeed?: number
  maxRayGaps?: number
  rayGapWidth?: number
  dotCount?: number
  dotRadius?: number
  dotColor?: string
  circleCount?: number
  circleRadius?: number
  circleColor?: string
}

// Define a type for a segment of a ray
type RaySegment = {
  x1: number
  y1: number
  x2: number
  y2: number
}

interface RayFeature {
  type: 'circle' | 'dot' | null
  x?: number
  y?: number
}

interface Ray {
  segments: RaySegment[]
  features: RayFeature[] | null
  totalLength: number
  angle: number
  endX?: number
  endY?: number
}

export const AnimatedRays: FC<AnimatedRaysProps> = ({
  rayCount = 12,
  startRadius = 150,
  minEndRadius = 275,
  maxEndRadius = 400,
  duration = 1,
  staggerDelay = 0.05,
  rayWidth = 3,
  rayColor = '#c3ecce',
  rotationSpeed = 0.1,
  maxRayGaps = 2,
  rayGapWidth = 12,
  dotCount = 6,
  dotRadius = 2,
  dotColor = '#c3ecce',
  circleCount = 6,
  circleRadius = 3,
  circleColor = '#c3ecce',
  className,
  ...props
}) => {
  const [rays, setRays] = useState<Ray[]>([])

  // Calculate SVG dimensions based on the maximum extent needed for the lines
  // This ensures the SVG is large enough to contain all lines and the rotation doesn't clip them
  const maxDimension = maxEndRadius + rayWidth + Math.max(circleRadius, dotRadius, 0) // Max extent from the calculated centre
  const svgWidth = maxDimension * 2
  const svgHeight = maxDimension * 2

  // Calculate cx and cy dynamically to be the true centre of the SVG viewBox
  const cx = svgWidth / 2
  const cy = svgHeight / 2

  useEffect(() => {
    const generatedRays: Ray[] = []

    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * 2 * Math.PI // Angle in radians

      const randomEndRadius = minEndRadius + Math.random() * (maxEndRadius - minEndRadius)
      const totalLineLength = randomEndRadius - startRadius

      // Determine a random number of gaps/breaks for this line (0, 1, or 2)
      const gapCount = Math.floor(Math.random() * (maxRayGaps + 1))
      const segmentCount = gapCount + 1 // 0 breaks = 1 segment, 1 break = 2 segments, etc.
      const totalGapSpace = gapCount * rayGapWidth

      const currentLineSegments: RaySegment[] = []

      // Calculate the available length for segments after accounting for gaps
      let availableSegmentLength = totalLineLength - totalGapSpace

      // Ensure availableSegmentLength is not negative (if gaps are too wide)
      if (availableSegmentLength < 0) {
        availableSegmentLength = 0
      }

      // Distribute the available length equally among the segments
      const segmentBaseLength = segmentCount > 0 ? availableSegmentLength / segmentCount : 0

      let currentRadialStart = startRadius
      let lastSegmentEndX = 0
      let lastSegmentEndY = 0

      for (let j = 0; j < segmentCount; j++) {
        // Only draw a segment if it has a positive length
        if (segmentBaseLength > 0.01) {
          // Small threshold to avoid tiny invisible segments
          const segmentStartX = cx + currentRadialStart * Math.cos(angle)
          const segmentStartY = cy + currentRadialStart * Math.sin(angle)

          // Ensure the segment does not exceed the random end radius
          const segmentEndRadial = currentRadialStart + segmentBaseLength
          const segmentEndX = cx + segmentEndRadial * Math.cos(angle)
          const segmentEndY = cy + segmentEndRadial * Math.sin(angle)

          // Add the segment to the line
          currentLineSegments.push({
            x1: segmentStartX,
            y1: segmentStartY,
            x2: segmentEndX,
            y2: segmentEndY
          })

          // Move current start past the segment and then add the fixed gap
          currentRadialStart = segmentEndRadial

          // Update last segment end points for the next iteration
          lastSegmentEndX = segmentEndX
          lastSegmentEndY = segmentEndY
        } else {
          // If segmentBaseLength is tiny or negative, ensure we still get a valid end point
          lastSegmentEndX = cx + currentRadialStart * Math.cos(angle)
          lastSegmentEndY = cy + currentRadialStart * Math.sin(angle)
        }

        // Add gap after segment, but not after the very last segment
        if (j < gapCount) {
          // Only add gap if there's another segment coming
          currentRadialStart += rayGapWidth
        }
      }

      generatedRays.push({
        segments: currentLineSegments,
        features: null, // No features for now
        totalLength: totalLineLength,
        angle: angle,
        endX: lastSegmentEndX,
        endY: lastSegmentEndY
      })
    }

    // Add features like dots and circles to each ray
    let assignedDotCount = 0
    let assignedCircleCount = 0

    // Sort rays by total length (shortest to longest)
    generatedRays.sort((a, b) => a.totalLength - b.totalLength)

    // Distribute dots and circles across the rays
    const raysWithFeatures = generatedRays.map((ray) => {
      let feature: RayFeature | null = null

      const featureDistance = rayGapWidth // or any value you want for the gap

      const featureX = ray.endX! + featureDistance * Math.cos(ray.angle)
      const featureY = ray.endY! + featureDistance * Math.sin(ray.angle)

      // Attempt to add a circle
      if (assignedCircleCount < circleCount && Math.random() < 0.5) {
        // 50% chance
        feature = {
          type: 'circle',
          x: featureX,
          y: featureY
        }
        assignedCircleCount++
      } else if (
        // If no circle was added, try to add a dot
        assignedDotCount < dotCount &&
        Math.random() < 0.5
      ) {
        // 50% chance
        feature = {
          type: 'dot',
          x: featureX,
          y: featureY
        }
        assignedDotCount++
      } else if (
        // If we still have circles left and they are more than remaining dots, add a circle
        assignedCircleCount < circleCount &&
        circleCount - assignedCircleCount >= rayCount - generatedRays.indexOf(ray)
      ) {
        feature = {
          type: 'circle',
          x: featureX,
          y: featureY
        }
        assignedCircleCount++
      } else if (
        // If we still have dots left and they are more than remaining circles, add a dot
        assignedDotCount < dotCount &&
        dotCount - assignedDotCount >= rayCount - generatedRays.indexOf(ray)
      ) {
        feature = {
          type: 'dot',
          x: featureX,
          y: featureY
        }
        assignedDotCount++
      }

      // Return the ray with its features as an array (or empty array)
      return { ...ray, features: feature ? [feature] : [] }
    })

    // Second pass
    if (assignedCircleCount < circleCount || assignedDotCount < dotCount) {
      raysWithFeatures.forEach((ray) => {
        if ((!ray.features || ray.features.length === 0) && assignedCircleCount < circleCount) {
          ray.features = [{ type: 'circle', x: ray.endX, y: ray.endY }]
          assignedCircleCount++
        } else if ((!ray.features || ray.features.length === 0) && assignedDotCount < dotCount) {
          ray.features = [{ type: 'dot', x: ray.endX, y: ray.endY }]
          assignedDotCount++
        }
      })
    }

    // Shuffle them back to their original angular order for rendering consistency
    raysWithFeatures.sort((a, b) => a.angle - b.angle)
    setRays(raysWithFeatures)
  }, [
    rayCount,
    startRadius,
    minEndRadius,
    maxEndRadius,
    cx,
    cy,
    maxRayGaps,
    rayGapWidth,
    circleCount,
    circleRadius,
    dotCount,
    dotRadius
  ])

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: duration, ease: easeOut }
    }
  }

  const featureVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: easeOut, delay: duration + 0.1 } // Appear after line animates
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
        pointerEvents="none"
        animate={{ rotate: 360 }}
        transition={{ duration: transitionDuration, repeat: Infinity, ease: 'linear' }}
        variants={containerVariants}
        // Set transform-origin to the centre of the SVG for correct rotation
        style={{ transformOrigin: `${cx}px ${cy}px`, overflow: 'visible' }}
      >
        {rays.map((ray, rayIndex) => (
          <motion.g key={rayIndex}>
            {ray.segments.map((segment, segmentIndex) => (
              <motion.line
                key={`${rayIndex}-${segmentIndex}`}
                x1={segment.x1}
                y1={segment.y1}
                x2={segment.x2}
                y2={segment.y2}
                stroke={rayColor}
                strokeWidth={rayWidth}
                variants={lineVariants}
              />
            ))}
            {/* Render feature if assigned */}
            {ray.features &&
              ray.features.map((feature, featureIndex) => {
                if (feature.type === 'circle') {
                  return (
                    <motion.circle
                      key={`${rayIndex}-circle-${featureIndex}`}
                      cx={feature.x}
                      cy={feature.y}
                      r={circleRadius}
                      fill="transparent"
                      stroke={circleColor}
                      strokeWidth={rayWidth}
                      variants={featureVariants}
                    />
                  )
                } else if (feature.type === 'dot') {
                  return (
                    <motion.circle
                      key={`${rayIndex}-dot-${featureIndex}`}
                      cx={feature.x}
                      cy={feature.y}
                      r={dotRadius}
                      fill={dotColor}
                      variants={lineVariants}
                    />
                  )
                }
                return null
              })}
          </motion.g>
        ))}
      </motion.svg>
    </div>
  )
}
