import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import React from "react";

interface TooltipProps {
    children: React.ReactNode;
    content: string | React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
}

const Tooltip = ({ children, content, side = "top", align = "center" }: TooltipProps) => {
    return (
        <TooltipPrimitive.Root delayDuration={200}>
            <TooltipPrimitive.Trigger asChild>
                {children}
            </TooltipPrimitive.Trigger>
            <TooltipPrimitive.Portal>
                <TooltipPrimitive.Content
                    side={side}
                    align={align}
                    sideOffset={8}
                    className="z-[100] overflow-hidden rounded-xl bg-slate-900/90 backdrop-blur-md px-4 py-2 text-[11px] font-bold text-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] border border-white/10 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200"
                >
                    {content}
                    <TooltipPrimitive.Arrow className="fill-slate-900/90" />
                </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
    );
};

export default Tooltip;
