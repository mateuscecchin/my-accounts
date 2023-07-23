import { ArrowDown, ArrowUp, DollarSign, LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

interface Props {
  title: string;
  type: InfoType;
  value: string;
  aditional?: string;
}

type InfoType = keyof typeof ICON;

const ICON = {
  payment: <ArrowDown className="text-red-500" />,
  receive: <ArrowUp className="text-green-500" />,
  total: <DollarSign className="text-black dark:text-white" />
}

export function CardSummary({ title, value, aditional, type }: Props) {
  const Icon = () => ICON[type]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {aditional && <p className="text-xs text-muted-foreground">
          {aditional}
        </p>}
      </CardContent>
    </Card>
  )
}