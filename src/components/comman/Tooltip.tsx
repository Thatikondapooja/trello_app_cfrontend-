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
                    sideOffset={5}
                    className="z-[100] overflow-hidden rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-xl ring-1 ring-white/10 transition-all"
                >
                    {content}
                    <TooltipPrimitive.Arrow className="fill-slate-900" />
                </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
    );
};

export default Tooltip;
