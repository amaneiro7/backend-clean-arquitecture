import Img from "../../../assets/bnclogo.webp";

interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

export function LazyLogoImage({...props}: Props) {
  return <img {...props} src={Img} alt="Logo" />;
}
