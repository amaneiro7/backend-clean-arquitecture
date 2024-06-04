import { UserApiResponse } from "../../../modules/shared/domain/types/responseTypes";

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  user: UserApiResponse;
}

export function WelcomeTitle({ user, ...props }: Props) {
  return (
    <>
      <p {...props} className="flex flex-col text-white">
        <span>Bienvenido, </span>
        <span>{`${user?.user?.name} ${user?.user?.lastName}`}</span>
      </p>
    </>
  );
}
