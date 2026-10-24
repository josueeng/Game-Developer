import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

// Câmera com leve zoom e deslocamento ao longo da cena (efeito Ken Burns).
export const KenBurns: React.FC<{
	children: React.ReactNode;
	zoom?: [number, number];
	pan?: [number, number]; // deslocamento final em px (x, y)
	origem?: string;
}> = ({children, zoom = [1, 1.06], pan = [0, 0], origem = '50% 45%'}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const p = interpolate(frame, [0, durationInFrames], [0, 1], {extrapolateRight: 'clamp'});
	const s = zoom[0] + (zoom[1] - zoom[0]) * p;
	return (
		<AbsoluteFill
			style={{
				transform: `translate(${pan[0] * p}px, ${pan[1] * p}px) scale(${s})`,
				transformOrigin: origem,
			}}
		>
			{children}
		</AbsoluteFill>
	);
};
