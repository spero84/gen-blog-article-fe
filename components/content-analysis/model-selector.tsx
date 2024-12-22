'use client'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface ModelSelectorProps {
  value: 'gpt' | 'claude' | 'hybrid'
  onChange: (value: 'gpt' | 'claude' | 'hybrid') => void
}

export const ModelSelector = ({ value, onChange }: ModelSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">LLM 모델 선택</h3>
      <RadioGroup
        value={value}
        onValueChange={onChange as (value: string) => void}
        className="grid grid-cols-3 gap-4"
      >
        <div>
          <RadioGroupItem value="gpt" id="gpt" className="peer sr-only" />
          <Label
            htmlFor="gpt"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <span>ChatGPT</span>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="claude" id="claude" className="peer sr-only" />
          <Label
            htmlFor="claude"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <span>Claude</span>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="hybrid" id="hybrid" className="peer sr-only" />
          <Label
            htmlFor="hybrid"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <span>Hybrid</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
} 