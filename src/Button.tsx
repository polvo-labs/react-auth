import * as React from "react";

import "./Button.less";
import {dynaClassName} from "./utils/dynaClassName";

export enum EStyle {
	ROUNDED = "ROUNDED",
}

export enum EColor {
	WHITE_BLACK = "WHITE_BLACK",
	WHITE_RED = "WHITE_RED",
	BLACK_WHITE = "BLACK_WHITE",
	TRANSPARENT_WHITE = "TRANSPARENT_WHITE",
}

export enum ESize {
	SMALL = "SMALL",
	MEDIUM = "MEDIUM",
	LARGE = "LARGE",
	XLARGE = "XLARGE",
}

export interface IButtonProps {
	children: any;
	style?: EStyle;
	color?: EColor;
	size?: ESize;
	href?: string
	onClick?: () => void;
}

export class Button extends React.Component<IButtonProps> {
	static defaultProps: IButtonProps = {
		children: null,
		style: EStyle.ROUNDED,
		color: EColor.WHITE_BLACK,
		size: ESize.MEDIUM,
		href: null,
		onClick: () => undefined,
	};

	private readonly className = dynaClassName("my-button");

	public render(): JSX.Element {
		const {
			children, style, color, size, href, onClick
		} = this.props;

		const className: string = [
			this.className(),
			this.className(`--style-${style}`),
			this.className(`--color-${color}`),
			this.className(`--size-${size}`),
		].join(' ').trim();

		return (
			<a className={className} href={href} onClick={onClick}>
				<button>{children}</button>
			</a>
		);
	}
}