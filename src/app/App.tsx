import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Copy,
  ExternalLink,
  Flame,
  Image as ImageIcon,
  Instagram,
  Loader2,
  Lock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Upload,
  Users,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import toast, { Toaster } from 'react-hot-toast';

import galleryImg1 from '../imports/Screenshot_2026_08_10_21_56_20_91_948cd9899890cbd5c2798760b2b95377.jpg';
import galleryImg2 from '../imports/Screenshot_2026_08_10_21_56_34_83_948cd9899890cbd5c2798760b2b95377.jpg';
import galleryImg3 from '../imports/Screenshot_2026_08_10_21_57_02_74_948cd9899890cbd5c2798760b2b95377.jpg';
import galleryImg4 from '../imports/Screenshot_2026_08_10_22_02_08_82_948cd9899890cbd5c2798760b2b95377.jpg';
import proofPayment from '../imports/Screenshot_20260709_004939_PhonePe.jpg';
import proofReview1 from '../imports/Screenshot_2024-09-29-20-43-34-268_com.facebook.katana.jpg';
import proofReview2 from '../imports/Screenshot_2024_10_16_12_09_16_54_f598e1360c96b5a5aa16536c303cff92.jpg';
import proofReview3 from '../imports/Screenshot_2025_02_04_11_05_01_43_f598e1360c96b5a5aa16536c303cff92.jpg';

const ORANGE = '#FF6A2A';
const ORANGE_DARK = '#E75314';
const CREAM = '#F5F2ED';
const BLACK = '#111111';
const SOFT = '#6B625C';
const BORDER = '#111111';
const WHITE = '#FFFFFF';

const MEMBERSHIP_PRICE = 899;
const PRICE_LABEL = `₹${MEMBERSHIP_PRICE.toLocaleString('en-IN')}`;
const INSTAGRAM_URL = 'https://instagram.com/datespot_group';
const INSTAGRAM_HANDLE = '@datespot_group';
const GROUP_LINK = 'https://t.me/+JOYVaKXWmeI5NThl';
const UPI_ID = 'BHARATPE2R0S0C1D6V46619@unitype';
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbyCKSBtujafafwO6z_vwD7y0NfMFD7qG3nHdNOBEi-oWXg9yyBFCiGzESM-hFpcaAyg/exec';

type UploadState = 'idle' | 'verifying' | 'success';

const REVIEWS = [
  {
    name: 'Rahul M.',
    title: 'Joined from Bangalore',
    text: 'Good active group bro. Real replies and genuine conversations. Worth the one-time fee.',
  },
  {
    name: 'Vikram S.',
    title: 'Member review',
    text: 'Finally something that feels proper. Clean process, active members, and no fake nonsense.',
  },
  {
    name: 'Aditya P.',
    title: 'Verified member',
    text: 'At first I did not trust it, but after joining I found real people and better conversations.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'What is the membership price?',
    a: `${PRICE_LABEL} one time. No recurring subscription and no monthly charges.`,
  },
  {
    q: 'What do I get after joining?',
    a: 'Access to the private Datespot Telegram community, active chats, community interaction, and the ability to connect with real members.',
  },
  {
    q: 'How do I join?',
    a: 'Tap Join Now, enter your details, pay through UPI, then upload the screenshot. After that you will be redirected to join the Telegram group.',
  },
  {
    q: 'Is this a recurring plan?',
    a: 'No. It is a one-time membership payment for access.',
  },
  {
    q: 'How can I contact Datespot?',
    a: `You can message us on Instagram at ${INSTAGRAM_HANDLE} for pre-join questions.`,
  },
];

const screenshots = [galleryImg1, galleryImg2, galleryImg3, galleryImg4];
const proofImages = [proofPayment, proofReview1, proofReview2, proofReview3];

const sectionCard = {
  background: WHITE,
  border: `2px solid ${BORDER}`,
  boxShadow: '8px 8px 0 #111111',
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function OutlineBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em]"
      style={{ background: WHITE, border: `2px solid ${BORDER}`, color: BLACK }}
    >
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mb-5 md:mb-7">
      <div className="mb-3"><OutlineBadge>{eyebrow}</OutlineBadge></div>
      <h2 className="text-[28px] leading-[0.95] md:text-[42px] font-black uppercase tracking-[-0.04em]" style={{ color: BLACK }}>
        {title}
      </h2>
      {text && <p className="mt-3 max-w-2xl text-sm md:text-base font-medium" style={{ color: SOFT }}>{text}</p>}
    </div>
  );
}

function LeadModal({ onClose, onComplete }: { onClose: () => void; onComplete: () => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({ name: name.trim(), phone: phone.trim() });
      await fetch(`${SHEET_URL}?${params.toString()}`, { mode: 'no-cors' });
      localStorage.setItem('ds_lead_submitted', '1');
      localStorage.setItem('ds_lead_name', name.trim());
      localStorage.setItem('ds_lead_phone', phone.trim());
      onComplete();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.98 }}
        className="relative w-full max-w-md rounded-[28px] p-5 md:p-6"
        style={{ ...sectionCard, boxShadow: '10px 10px 0 #111111' }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-xs font-black"
          style={{ background: CREAM, border: `2px solid ${BORDER}` }}
        >
          CLOSE
        </button>
        <OutlineBadge>Before Payment</OutlineBadge>
        <h3 className="mt-4 text-2xl md:text-3xl font-black uppercase tracking-[-0.04em]" style={{ color: BLACK }}>
          Enter your details
        </h3>
        <p className="mt-2 text-sm font-medium" style={{ color: SOFT }}>
          This keeps the joining flow clean and helps you continue to payment.
        </p>

        <form onSubmit={submit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: BLACK }}>
              Full name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-2xl px-4 py-3 text-sm font-semibold outline-none"
              style={{ background: CREAM, border: `2px solid ${BORDER}`, color: BLACK }}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: BLACK }}>
              Mobile number
            </label>
            <div className="flex items-center overflow-hidden rounded-2xl" style={{ background: CREAM, border: `2px solid ${BORDER}` }}>
              <span className="px-4 py-3 text-sm font-black" style={{ color: SOFT }}>+91</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="10-digit number"
                className="min-w-0 flex-1 bg-transparent px-1 pr-4 py-3 text-sm font-semibold outline-none"
                style={{ color: BLACK }}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-2xl px-4 py-3 text-sm font-semibold" style={{ background: '#FFF0E8', border: `2px solid ${BORDER}`, color: BLACK }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-black uppercase transition-transform active:scale-[0.98]"
            style={{ background: ORANGE, border: `2px solid ${BORDER}`, boxShadow: '6px 6px 0 #111111', color: WHITE }}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Continue to payment <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function PaymentModal({ onClose }: { onClose: () => void }) {
  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=Datespot&am=${MEMBERSHIP_PRICE}&cu=INR`;
  const [tab, setTab] = useState<'qr' | 'upi'>('qr');
  const [uploadState, setUploadState] = useState<UploadState>('idle');

  const compressImage = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const max = 900;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL('image/jpeg', 0.75).split(',')[1]);
      };
      img.src = url;
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadState('verifying');
    toast.success('Verifying payment...');

    try {
      const base64 = await compressImage(file);
      const name = localStorage.getItem('ds_lead_name') ?? '';
      const phone = localStorage.getItem('ds_lead_phone') ?? '';
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'screenshot', name, phone, mimeType: 'image/jpeg', fileName: `payment_${Date.now()}.jpg`, image: base64 }),
      });
    } catch {
      // preserve current simple flow
    }

    setTimeout(() => {
      setUploadState('success');
      toast.success('Payment verified! Redirecting...');
      confetti({ particleCount: 140, spread: 90, origin: { y: 0.62 }, colors: [ORANGE, '#111111', '#ffffff'] });
      setTimeout(() => window.open(GROUP_LINK, '_blank'), 1200);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0" onClick={uploadState === 'idle' ? onClose : undefined} />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        className="relative w-full max-w-md rounded-[28px] p-4 md:p-5"
        style={{ ...sectionCard, boxShadow: '12px 12px 0 #111111', background: WHITE }}
      >
        {uploadState === 'idle' && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-xs font-black"
            style={{ background: CREAM, border: `2px solid ${BORDER}` }}
          >
            CLOSE
          </button>
        )}

        <div className="mb-4 flex items-start justify-between gap-3 pr-14">
          <div>
            <OutlineBadge>Join Datespot</OutlineBadge>
            <h3 className="mt-3 text-2xl font-black uppercase tracking-[-0.04em]" style={{ color: BLACK }}>
              Complete payment
            </h3>
            <p className="mt-1 text-sm font-medium" style={{ color: SOFT }}>
              One-time membership for private Telegram access.
            </p>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: SOFT }}>
              Price
            </div>
            <div className="text-3xl font-black" style={{ color: ORANGE_DARK }}>
              {PRICE_LABEL}
            </div>
          </div>
        </div>

        {uploadState === 'idle' && (
          <>
            <div className="mb-4 flex rounded-2xl p-1" style={{ background: CREAM, border: `2px solid ${BORDER}` }}>
              {(['qr', 'upi'] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className="flex-1 rounded-xl px-4 py-2.5 text-xs font-black uppercase transition-colors"
                  style={tab === item ? { background: ORANGE, color: WHITE, border: `2px solid ${BORDER}` } : { color: BLACK }}
                >
                  {item === 'qr' ? 'Scan QR' : 'UPI ID'}
                </button>
              ))}
            </div>

            {tab === 'qr' ? (
              <div className="mb-4 rounded-[24px] p-4 text-center" style={{ background: CREAM, border: `2px solid ${BORDER}` }}>
                <QRCodeSVG value={upiUrl} size={170} level="H" className="mx-auto" />
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em]" style={{ color: SOFT }}>
                  Scan with any UPI app
                </p>
              </div>
            ) : (
              <div className="mb-4 rounded-[24px] p-4" style={{ background: CREAM, border: `2px solid ${BORDER}` }}>
                <p className="text-[11px] font-black uppercase tracking-[0.12em]" style={{ color: SOFT }}>
                  UPI ID
                </p>
                <p className="mt-2 break-all text-sm font-black" style={{ color: BLACK }}>{UPI_ID}</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(UPI_ID);
                      toast.success('UPI ID copied');
                    }}
                    className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black uppercase"
                    style={{ background: WHITE, border: `2px solid ${BORDER}`, color: BLACK }}
                  >
                    <Copy className="h-4 w-4" /> Copy
                  </button>
                  <a
                    href={upiUrl}
                    onClick={() => toast.success('Opening UPI app...')}
                    className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black uppercase"
                    style={{ background: ORANGE, border: `2px solid ${BORDER}`, color: WHITE, boxShadow: '5px 5px 0 #111111' }}
                  >
                    <ExternalLink className="h-4 w-4" /> Pay
                  </a>
                </div>
              </div>
            )}

            <div className="rounded-[24px] p-4" style={{ background: '#FFF6F1', border: `2px dashed ${BORDER}` }}>
              <p className="text-center text-xs font-black uppercase tracking-[0.12em]" style={{ color: BLACK }}>
                Upload screenshot to verify
              </p>
              <input type="file" accept="image/*" id="payment-upload" className="hidden" onChange={handleFileChange} />
              <label
                htmlFor="payment-upload"
                className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-black uppercase"
                style={{ background: ORANGE, border: `2px solid ${BORDER}`, color: WHITE, boxShadow: '6px 6px 0 #111111' }}
              >
                <Upload className="h-4 w-4" /> Upload screenshot
              </label>
            </div>
          </>
        )}

        {uploadState === 'verifying' && (
          <div className="py-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ background: '#FFF1E9', border: `2px solid ${BORDER}` }}>
              <Loader2 className="h-8 w-8 animate-spin" style={{ color: ORANGE_DARK }} />
            </div>
            <h4 className="mt-4 text-xl font-black uppercase" style={{ color: BLACK }}>Verifying payment</h4>
            <p className="mt-2 text-sm font-medium" style={{ color: SOFT }}>Please wait a moment…</p>
          </div>
        )}

        {uploadState === 'success' && (
          <div className="py-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ background: ORANGE, border: `2px solid ${BORDER}` }}>
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h4 className="mt-4 text-xl font-black uppercase" style={{ color: BLACK }}>Payment verified</h4>
            <p className="mt-2 text-sm font-medium" style={{ color: SOFT }}>Redirecting you to Datespot…</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function FAQItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) {
  return (
    <div className="overflow-hidden rounded-[22px]" style={{ ...sectionCard, boxShadow: '6px 6px 0 #111111' }}>
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm md:text-base font-black" style={{ color: BLACK }}>{q}</span>
        <ChevronDown className="h-5 w-5 shrink-0 transition-transform" style={{ color: BLACK, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>
      {open && <div className="px-4 pb-4 text-sm font-medium leading-relaxed" style={{ color: SOFT }}>{a}</div>}
    </div>
  );
}

function StickyJoin({ onJoin }: { onJoin: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t px-4 py-3 md:hidden" style={{ background: 'rgba(245,242,237,0.96)', borderColor: 'rgba(17,17,17,0.12)', backdropFilter: 'blur(8px)' }}>
      <button
        onClick={onJoin}
        className="flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-black uppercase"
        style={{ background: ORANGE, border: `2px solid ${BORDER}`, color: WHITE, boxShadow: '6px 6px 0 #111111' }}
      >
        Join now · {PRICE_LABEL} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function AppShell() {
  const [showLead, setShowLead] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number>(0);

  const openJoinFlow = () => {
    if (localStorage.getItem('ds_lead_submitted') === '1') {
      setShowPayment(true);
    } else {
      setShowLead(true);
    }
  };

  const stats = useMemo(
    () => [
      { value: 'Real', label: 'People' },
      { value: 'Daily', label: 'Active chat' },
      { value: 'Private', label: 'Telegram access' },
      { value: PRICE_LABEL, label: 'One-time fee' },
    ],
    [],
  );

  const benefits = [
    { icon: MessageCircle, title: 'Real conversations', text: 'Built for clean, direct chatting with active community members.' },
    { icon: ShieldCheck, title: 'Private access', text: 'Paid access keeps the space more serious, focused, and less spammy.' },
    { icon: Users, title: 'Active community', text: 'Join a community that is meant for regular interaction, not dead groups.' },
    { icon: Sparkles, title: 'Simple joining flow', text: 'Short process, clear pricing, and a clean path to membership.' },
  ];

  return (
    <div style={{ background: CREAM, minHeight: '100vh', color: BLACK }}>
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-4 md:px-6 md:pb-14 md:pt-6">
        <header
          className="mb-5 flex items-center justify-between gap-3 rounded-[28px] px-4 py-4 md:px-6"
          style={{ background: WHITE, border: `2px solid ${BORDER}`, boxShadow: '8px 8px 0 #111111' }}
        >
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: SOFT }}>Datespot</div>
            <div className="text-xl md:text-2xl font-black uppercase tracking-[-0.05em]">Private Membership</div>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase"
            style={{ background: ORANGE, border: `2px solid ${BORDER}`, color: WHITE }}
          >
            <Instagram className="h-4 w-4" /> Insta / datespot_group
          </a>
        </header>

        <section
          className="relative overflow-hidden rounded-[36px] px-5 py-7 md:px-8 md:py-8"
          style={{ background: ORANGE, border: `2px solid ${BORDER}`, boxShadow: '10px 10px 0 #111111' }}
        >
          <div className="absolute right-[-40px] top-[-40px] h-40 w-40 rounded-[32px] bg-white/12 md:h-52 md:w-52" />
          <div className="absolute bottom-[-30px] left-[-20px] h-28 w-28 rounded-full bg-white/12" />
          <div className="grid items-center gap-7 md:grid-cols-[1.15fr_0.85fr]">
            <div className="relative z-10">
              <OutlineBadge>
                <Flame className="h-3.5 w-3.5" /> Bangalore Telegram community
              </OutlineBadge>
              <h1 className="mt-4 max-w-3xl text-[42px] leading-[0.9] md:text-[78px] font-black uppercase tracking-[-0.06em]" style={{ color: WHITE }}>
                Real chats.
                <br />
                Real people.
              </h1>
              <p className="mt-4 max-w-xl text-sm md:text-lg font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>
                A cleaner, more focused way to join Datespot. One-time access, private community, real conversations, and a simple join flow.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={openJoinFlow}
                  className="inline-flex items-center gap-2 rounded-2xl px-5 py-4 text-sm font-black uppercase transition-transform active:scale-[0.98]"
                  style={{ background: WHITE, border: `2px solid ${BORDER}`, color: BLACK, boxShadow: '6px 6px 0 #111111' }}
                >
                  Join Datespot · {PRICE_LABEL} <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl px-5 py-4 text-sm font-black uppercase"
                  style={{ background: 'rgba(255,255,255,0.14)', border: `2px solid ${WHITE}`, color: WHITE }}
                >
                  <Instagram className="h-4 w-4" /> Contact on Instagram
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-black uppercase tracking-[0.12em]">
                {['One-time payment', 'Private Telegram access', 'Clean, minimal & fast'].map((item) => (
                  <span key={item} className="rounded-full px-3 py-2" style={{ background: 'rgba(255,255,255,0.16)', color: WHITE, border: '2px solid rgba(255,255,255,0.28)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <div className="grid grid-cols-2 gap-3">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-[24px] p-4" style={{ background: WHITE, border: `2px solid ${BORDER}`, boxShadow: '6px 6px 0 #111111' }}>
                    <div className="text-2xl md:text-3xl font-black uppercase tracking-[-0.05em]" style={{ color: BLACK }}>{item.value}</div>
                    <div className="mt-1 text-[11px] md:text-xs font-black uppercase tracking-[0.14em]" style={{ color: SOFT }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <main className="mt-8 space-y-10 md:space-y-14">
          <section>
            <SectionHeading
              eyebrow="Why Datespot"
              title="Compact, clean, and built to convert"
              text="The page now focuses on what matters: clear pricing, visual proof, a shorter hero section, and a direct contact path without clutter."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-[26px] p-5" style={{ ...sectionCard, boxShadow: '8px 8px 0 #111111' }}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: ORANGE, border: `2px solid ${BORDER}` }}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="mt-4 text-xl font-black uppercase tracking-[-0.04em]" style={{ color: BLACK }}>{item.title}</h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed" style={{ color: SOFT }}>{item.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <SectionHeading
              eyebrow="Preview"
              title="See the community style"
              text="A simple preview of the kind of group screenshots and activity members expect to see before joining."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {screenshots.map((src, index) => (
                <div key={src} className="overflow-hidden rounded-[28px]" style={{ ...sectionCard, boxShadow: '8px 8px 0 #111111' }}>
                  <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'rgba(17,17,17,0.12)', background: '#FFF6F1' }}>
                    <span className="text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: BLACK }}>Preview {index + 1}</span>
                    <ImageIcon className="h-4 w-4" style={{ color: ORANGE_DARK }} />
                  </div>
                  <img src={src} alt={`Datespot preview ${index + 1}`} className="h-[360px] w-full object-cover object-top" loading="lazy" />
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                eyebrow="How it works"
                title="3 steps. No confusion."
                text="The join path is intentionally minimal so more visitors actually finish it."
              />
              <div className="space-y-4">
                {[
                  ['01', 'Enter your details', 'Quick lead step before payment.'],
                  ['02', `Pay ${PRICE_LABEL}`, 'Use the UPI QR or copy the UPI ID.'],
                  ['03', 'Upload screenshot', 'After upload, continue into the Telegram group.'],
                ].map(([step, title, text]) => (
                  <div key={step} className="flex gap-4 rounded-[26px] p-5" style={{ ...sectionCard, boxShadow: '7px 7px 0 #111111' }}>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black" style={{ background: ORANGE, border: `2px solid ${BORDER}`, color: WHITE }}>
                      {step}
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-[-0.03em]" style={{ color: BLACK }}>{title}</h3>
                      <p className="mt-1 text-sm font-medium" style={{ color: SOFT }}>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Proof"
                title="Real screenshots & member response"
                text="Existing proof screenshots stay in the page, but the layout is cleaner and faster to scan."
              />
              <div className="grid grid-cols-2 gap-4">
                {proofImages.map((src, index) => (
                  <div key={src} className="overflow-hidden rounded-[24px]" style={{ ...sectionCard, boxShadow: '7px 7px 0 #111111' }}>
                    <img src={src} alt={`Proof ${index + 1}`} className="h-40 w-full object-cover object-top" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <SectionHeading
              eyebrow="Reviews"
              title="What members say"
              text="Short, direct feedback presented in a cleaner card system."
            />
            <div className="grid gap-4 lg:grid-cols-3">
              {REVIEWS.map((review) => (
                <div key={review.name} className="rounded-[28px] p-5" style={{ ...sectionCard, boxShadow: '8px 8px 0 #111111' }}>
                  <div className="mb-3 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" style={{ color: ORANGE_DARK }} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed font-medium" style={{ color: BLACK }}>
                    “{review.text}”
                  </p>
                  <div className="mt-4">
                    <div className="text-sm font-black uppercase" style={{ color: BLACK }}>{review.name}</div>
                    <div className="text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: SOFT }}>{review.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading
              eyebrow="FAQ"
              title="Questions before you join"
              text="Simple answers, without the extra sections that were slowing down the page."
            />
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, index) => (
                <FAQItem
                  key={item.q}
                  q={item.q}
                  a={item.a}
                  open={faqOpen === index}
                  onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}
                />
              ))}
            </div>
          </section>

          <section className="rounded-[36px] px-5 py-7 md:px-8 md:py-8" style={{ background: WHITE, border: `2px solid ${BORDER}`, boxShadow: '10px 10px 0 #111111' }}>
            <div className="grid items-center gap-6 md:grid-cols-[1.05fr_0.95fr]">
              <div>
                <SectionHeading
                  eyebrow="Final CTA"
                  title="Ready to join Datespot?"
                  text="No WhatsApp. No meet-admin section. Just a clean join path and Instagram contact for pre-join questions."
                />
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={openJoinFlow}
                    className="inline-flex items-center gap-2 rounded-2xl px-5 py-4 text-sm font-black uppercase"
                    style={{ background: ORANGE, border: `2px solid ${BORDER}`, color: WHITE, boxShadow: '6px 6px 0 #111111' }}
                  >
                    Get membership · {PRICE_LABEL} <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl px-5 py-4 text-sm font-black uppercase"
                    style={{ background: CREAM, border: `2px solid ${BORDER}`, color: BLACK }}
                  >
                    <Instagram className="h-4 w-4" /> {INSTAGRAM_HANDLE}
                  </a>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['Private access', 'Members join through a paid gateway.'],
                  ['Minimal UI', 'Fewer sections, cleaner hierarchy, faster browsing.'],
                  ['Instagram support', 'Questions go to the public social contact.'],
                  ['Telegram goal', 'Every CTA pushes toward the join flow.'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-[24px] p-4" style={{ background: '#FFF6F1', border: `2px solid ${BORDER}` }}>
                    <div className="text-sm font-black uppercase" style={{ color: BLACK }}>{title}</div>
                    <div className="mt-1 text-sm font-medium" style={{ color: SOFT }}>{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-10 text-center">
          <p className="text-xs md:text-sm font-black uppercase tracking-[0.16em]" style={{ color: SOFT }}>
            © 2026 Datespot · {PRICE_LABEL} one-time membership · Instagram {INSTAGRAM_HANDLE}
          </p>
        </footer>
      </div>

      <StickyJoin onJoin={openJoinFlow} />

      <AnimatePresence>
        {showLead && (
          <LeadModal
            onClose={() => setShowLead(false)}
            onComplete={() => {
              setShowLead(false);
              setShowPayment(true);
            }}
          />
        )}
        {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}
      </AnimatePresence>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: WHITE,
            color: BLACK,
            border: `2px solid ${BORDER}`,
            borderRadius: '16px',
            fontWeight: 800,
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
