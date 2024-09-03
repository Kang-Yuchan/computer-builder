type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <div>
      <div className="m-2 pt-3">
        <h4 className="text-2xl font-semibold">{title}</h4>
      </div>
      {children}
    </div>
  );
}
