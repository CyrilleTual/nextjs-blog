type Props = { children: React.ReactNode };

export default function PageContainer({ children }: Props) {
  return <div className="mx-auto w-full max-w-7xl "> {children} </div>;
}
