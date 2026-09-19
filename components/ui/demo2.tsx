import { GlassButton } from "@/components/ui/glass-button";

const ZapIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

const DottedBackground = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="100%"
        width="100%"
        className="pointer-events-none absolute inset-0 z-0"
    >
        <defs>
            <pattern
                patternUnits="userSpaceOnUse"
                height="30"
                width="30"
                id="dottedGrid"
            >
                <circle
                    fill="oklch(from var(--foreground) l c h / 30%)"
                    r="1"
                    cy="2"
                    cx="2"
                ></circle>
            </pattern>
        </defs>
        <rect fill="url(#dottedGrid)" height="100%" width="100%"></rect>
    </svg>
);

const GlassButtonDemo = () => {
    return (
        <div className="relative flex h-screen w-full flex-col items-center justify-center gap-8 bg-background p-10">
            <DottedBackground />
            <div className="z-10 text-center">
                <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
                    <GlassButton
                        size="sm"
                    >
                        Small
                    </GlassButton>
                    <GlassButton
                        size="default"
                        contentClassName="flex items-center gap-2"
                    >
                        <span>Generate</span>

                        <ZapIcon className="h-5 w-5" />
                    </GlassButton>
                    <GlassButton
                        size="lg"
                    >
                        Submit
                    </GlassButton>
                    <GlassButton
                        size="icon"
                    >
                        <ZapIcon className="h-5 w-5" />
                    </GlassButton>
                </div>
            </div>
        </div>
    );
};

export default GlassButtonDemo;
