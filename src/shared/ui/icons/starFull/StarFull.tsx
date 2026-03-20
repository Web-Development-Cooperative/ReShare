import type { SVGIconStar } from '~~>shared/model/icon.types';

const StarFull: SVGIconStar = ({ size = 'large', ...props }) => {
	switch (size) {
		case 'large':
			return (
				<svg
					width="40"
					height="40"
					viewBox="0 0 40 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					{...props}
				>
					<path
						d="M20 28.7834L30.3 35L27.5667 23.2834L36.6667 15.4L24.6834 14.3667L20 3.33337L15.3167 14.3667L3.33337 15.4L12.4167 23.2834L9.70004 35L20 28.7834Z"
						fill="#FBBF24"
					/>
				</svg>
			);
		case 'medium':
			return (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					{...props}
				>
					<path
						d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.45 13.97L5.82 21L12 17.27Z"
						fill="#FBBF24"
					/>
				</svg>
			);
		case 'small':
			return (
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					{...props}
				>
					<path
						d="M8 2L9.77994 6.05749L14 6.58359L10.88 9.61736L11.7082 14L8 11.8175L4.2918 14L5.12 9.61736L2 6.58359L6.22006 6.05749L8 2Z"
						fill="#FBBF24"
					/>
				</svg>
			);

		default:
			return null;
	}
};

export { StarFull };
