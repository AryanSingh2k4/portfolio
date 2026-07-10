export default function TiltCard({ children, className = '', style = {} }) {
  return (
    <div
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}
