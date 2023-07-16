type Enumerable<T> = { [k: string]: T };

// CSS Module
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.sass' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.less' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.styl' {
    const classes: { [key: string]: string };
    export default classes;
}

// CSS
declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.less";

// Images
declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.gif";

declare module "react-classset" {
    export const cx: (...classes: any[] | [Enumerable<boolean>]) => string;
    export default cx;
}