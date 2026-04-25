export default function PropSightLogo({ size = 'md', showSlogan = false }) {
  const scale = size === 'sm' ? 0.5 : size === 'lg' ? 1.2 : 0.75;
  const iconW = Math.round(55 * scale);
  const iconH = Math.round(70 * scale);

  return (
    <div style={{ display:'flex', alignItems:'center', gap: Math.round(12*scale) }}>
      {/* Icon */}
      <svg width={iconW} height={iconH} viewBox="0 0 55 70" fill="none">
        <defs>
          <linearGradient id="bld-blue" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.95"/>
          </linearGradient>
          <linearGradient id="bld-gold" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.95"/>
          </linearGradient>
          <linearGradient id="gnd" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1D4ED8"/>
            <stop offset="100%" stopColor="#38BDF8"/>
          </linearGradient>
        </defs>

        {/* B1 */}
        <rect x="0" y="14" width="8" height="42" rx="1.5" fill="url(#bld-blue)" opacity="0.9"/>
        <rect x="1.5" y="17" width="2" height="2.5" rx="0.4" fill="#38BDF8" opacity="0.8"/>
        <rect x="4.5" y="17" width="2" height="2.5" rx="0.4" fill="#38BDF8" opacity="0.8"/>
        <rect x="1.5" y="22" width="2" height="2.5" rx="0.4" fill="#38BDF8" opacity="0.5"/>
        <rect x="4.5" y="22" width="2" height="2.5" rx="0.4" fill="#38BDF8" opacity="0.5"/>
        <line x1="4" y1="7" x2="4" y2="14" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="4" cy="5" r="2.5" fill="#38BDF8"/>
        <circle cx="4" cy="5" r="5" fill="none" stroke="#38BDF8" strokeWidth="0.6" opacity="0.3"/>

        {/* B2 */}
        <rect x="11" y="22" width="10" height="34" rx="1.5" fill="url(#bld-blue)" opacity="0.7"/>
        <rect x="13" y="25" width="2.5" height="3" rx="0.4" fill="#38BDF8" opacity="0.6"/>
        <rect x="16.5" y="25" width="2.5" height="3" rx="0.4" fill="#38BDF8" opacity="0.6"/>
        <rect x="13" y="31" width="2.5" height="3" rx="0.4" fill="#38BDF8" opacity="0.4"/>
        <rect x="16.5" y="31" width="2.5" height="3" rx="0.4" fill="#38BDF8" opacity="0.4"/>

        {/* B3 tallest gold */}
        <rect x="24" y="4" width="10" height="52" rx="1.5" fill="url(#bld-gold)" opacity="0.95"/>
        <rect x="26" y="8" width="2.5" height="3" rx="0.4" fill="#FCD34D" opacity="0.9"/>
        <rect x="29.5" y="8" width="2.5" height="3" rx="0.4" fill="#FCD34D" opacity="0.9"/>
        <rect x="26" y="14" width="2.5" height="3" rx="0.4" fill="#FCD34D" opacity="0.7"/>
        <rect x="29.5" y="14" width="2.5" height="3" rx="0.4" fill="#FCD34D" opacity="0.7"/>
        <rect x="26" y="20" width="2.5" height="3" rx="0.4" fill="#FCD34D" opacity="0.5"/>
        <rect x="29.5" y="20" width="2.5" height="3" rx="0.4" fill="#FCD34D" opacity="0.5"/>
        <line x1="29" y1="0" x2="29" y2="4" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="29" cy="-1" r="2.5" fill="#F59E0B"/>
        <circle cx="29" cy="-1" r="6" fill="none" stroke="#F59E0B" strokeWidth="0.7" opacity="0.4"/>

        {/* B4 */}
        <rect x="37" y="18" width="9" height="38" rx="1.5" fill="url(#bld-blue)" opacity="0.75"/>
        <rect x="38.5" y="22" width="2" height="2.5" rx="0.4" fill="#38BDF8" opacity="0.6"/>
        <rect x="41.5" y="22" width="2" height="2.5" rx="0.4" fill="#38BDF8" opacity="0.6"/>
        <rect x="38.5" y="28" width="2" height="2.5" rx="0.4" fill="#38BDF8" opacity="0.4"/>
        <rect x="41.5" y="28" width="2" height="2.5" rx="0.4" fill="#38BDF8" opacity="0.4"/>

        {/* B5 */}
        <rect x="49" y="28" width="6" height="28" rx="1.5" fill="url(#bld-blue)" opacity="0.55"/>

        {/* Ground line */}
        <rect x="0" y="56" width="55" height="1.5" rx="0.75" fill="url(#gnd)" opacity="0.7"/>

        {/* Circuit nodes */}
        <circle cx="4" cy="57" r="2.5" fill="#38BDF8" opacity="0.9"/>
        <circle cx="29" cy="57" r="2.5" fill="#F59E0B" opacity="0.9"/>
        <circle cx="52" cy="57" r="2.5" fill="#38BDF8" opacity="0.9"/>
        {/* Connector traces */}
        <line x1="4" y1="57" x2="4" y2="64" stroke="#1D4ED8" strokeWidth="1" opacity="0.5"/>
        <line x1="4" y1="64" x2="29" y2="64" stroke="#1D4ED8" strokeWidth="1" opacity="0.5"/>
        <line x1="29" y1="57" x2="29" y2="64" stroke="#1D4ED8" strokeWidth="1" opacity="0.5"/>
        <line x1="29" y1="64" x2="52" y2="64" stroke="#1D4ED8" strokeWidth="1" opacity="0.5"/>
        <line x1="52" y1="57" x2="52" y2="64" stroke="#1D4ED8" strokeWidth="1" opacity="0.5"/>
        <circle cx="4" cy="64" r="1.5" fill="#1D4ED8"/>
        <circle cx="29" cy="64" r="1.5" fill="#F59E0B" opacity="0.7"/>
        <circle cx="52" cy="64" r="1.5" fill="#1D4ED8"/>
      </svg>

      {/* Wordmark */}
      <div>
        <div style={{
          fontSize: size === 'sm' ? 16 : size === 'lg' ? 32 : 22,
          fontWeight: 800,
          letterSpacing: '-0.5px',
          lineHeight: 1,
          color: '#F1F5F9',
          fontFamily: 'system-ui, sans-serif',
        }}>
          Prop<span style={{
            background: 'linear-gradient(135deg, #1D4ED8, #38BDF8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Sight</span>
        </div>
        {showSlogan && (
          <div style={{
            fontSize: size === 'sm' ? 8 : 10,
            color: '#475569',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginTop: 3,
            fontFamily: 'system-ui, sans-serif',
          }}>
            Live Real Estate Insights
          </div>
        )}
      </div>
    </div>
  );
}
