import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import { AgentLineFigure } from '@/components/figures/agent-line/figure';

export const metadata = {
  title: 'Connectra - How an agent step runs',
};

export default function ConnectraPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container py-6 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-[60px]">
          {/* Left Column - Navigation */}
          <div className="w-full md:w-[200px] md:flex-shrink-0 pt-6 md:pt-12">
            <Navigation />
          </div>

          {/* Wide column - the figure and what it stands for */}
          <div className="w-full min-w-0 md:flex-1 xl:flex-none xl:w-[780px] pt-6 md:pt-12">
            <div className="space-y-8">
              <div className="mb-6">
                <Link href="/about" className="text-sm text-muted hover:text-link-hover mb-4 inline-block">
                  ← Back to Experience
                </Link>
                <h1 className="text-xl font-medium text-foreground mb-2">Connectra: how an agent step runs</h1>
                <p className="text-sm text-muted">
                  Cofounder &amp; CTO, Sep 2025 – Present. The agentic platform I&apos;m building, drawn as a machine you can run.
                </p>
              </div>

              <AgentLineFigure />

              <div className="space-y-6 text-sm text-foreground leading-relaxed">
                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Orchestration</h2>
                  <p>
                    Multi-step LLM orchestration pipelines with tool-calling and structured JSON outputs, so that every agent decision is
                    consistent, machine-readable and auditable end to end. In the figure this is the tool rack and the gate: the card goes
                    to the drawer for its tool, and only output that fits the schema is allowed to move on.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Observability</h2>
                  <p>
                    An observability layer that traces agent decisions, actions and outputs across distributed workflows. In the figure this
                    is the recorder: every station has a pen, and every event leaves a mark on the paper.
                  </p>
                </div>

                <div>
                  <h2 className="text-base font-medium text-foreground mb-4">Identity</h2>
                  <p>
                    Agent identity and credentialing, so that every action can be attributed to a specific agent. In the figure this is the
                    press: it only turns with the agent&apos;s own key, and the seal it leaves carries the same pattern as the key.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
