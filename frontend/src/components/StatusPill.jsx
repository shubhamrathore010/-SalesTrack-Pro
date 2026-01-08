const statusStyles = {
  new: { bg: "#e5e7eb", color: "#374151" },
  qualified: { bg: "#dcfce7", color: "#15803d" },
  lost: { bg: "#fee2e2", color: "#b91c1c" },
};

const StatusPill = ({ status }) => {
  const style = statusStyles[status] || statusStyles.new;

  return (
    <span
      style={{
        background: style.bg,
        color: style.color,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        textTransform: "uppercase",
      }}
    >
      {status}
    </span>
  );
};

export default StatusPill;
