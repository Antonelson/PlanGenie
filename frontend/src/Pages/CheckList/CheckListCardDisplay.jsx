export default function CheckListCardDisplay({ heading ,id}) {
  return (
    <div className="clc-card" >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');

        .clc-card {
          --color-surface: #171a20;
          --color-text: #e4e6eb;
          --color-primary: #5b8def;
          --color-border: #262a33;
          --font-display: 'Space Grotesk', sans-serif;
          --radius-md: 12px;
          --spacing-sm: 8px;
          --spacing-md: 16px;

          display: flex;
          align-items: center;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-left: 3px solid var(--color-primary);
          border-radius: var(--radius-md);
          padding: var(--spacing-md) 20px;
          margin-bottom: var(--spacing-sm);
        }

        .clc-heading {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 16px;
          line-height: 1.4;
          letter-spacing: -0.01em;
          color: var(--color-text);
          margin: 0;
        }
      `}</style>

      <h2 className="clc-heading">{heading}</h2>
    </div>
  );
}