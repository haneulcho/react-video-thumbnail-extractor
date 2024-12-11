import { AiOutlineVideoCameraAdd } from 'react-icons/ai';

type Props = {
  title: string;
  level?: React.ElementType;
};

export const PageTitle = ({ title, level: Level = 'h1' }: Props) => {
  return (
    <Level className="mb-4 flex items-center justify-center gap-2 text-center text-2xl font-bold text-primaryDark">
      <AiOutlineVideoCameraAdd className="text-2xl" />
      {title}
    </Level>
  );
};
