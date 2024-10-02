interface LoadingProps {
  description?: string;
}

export default function Loading({ description }: LoadingProps) {
  return (
    <div className="flex flex-col items-center gap-6" role="loading">
      <div
        className={`size-7 animate-activity-indicator rounded-full border-4 border-transparent border-t-green-dark`}
      />
      {description && (
        <h1 className="text-base font-semibold">{description}</h1>
      )}
    </div>
  );
}
