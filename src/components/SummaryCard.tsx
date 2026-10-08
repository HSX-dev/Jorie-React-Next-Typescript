type Props = {
  label: string;
  value: string;
  hint?: string;
};

const SummaryCard = ({ label, value, hint }: Props) => (
  <div className="card summary-card">
    <span className="summary-label">{label}</span>
    <strong className="summary-value">{value}</strong>
    {hint && <span className="summary-hint">{hint}</span>}
  </div>
);

export default SummaryCard;
