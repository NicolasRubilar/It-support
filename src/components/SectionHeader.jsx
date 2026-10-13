export default function SectionHeader({ id, title, text, children }) {
  return (
    <div className="section-head">
      <div>
        <h2 id={id}>{title}</h2>
        {text ? <p className="section-head__text">{text}</p> : null}
      </div>
      {children}
    </div>
  )
}
