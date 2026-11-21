"use client";

import { BellIcon, HeartIcon, SettingsIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { IconButton } from "@/components/icon-button";
import { ResponsiveSheet } from "@/components/responsive-sheet";
import { SegmentedControl } from "@/components/segmented-control";
import { EmptyState, ErrorState } from "@/components/state-views";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MilestoneToastContent } from "@/features/streaks/components/milestone-toast";

import { PreviewSection, Specimen, SpecimenGrid, SubHeading } from "./preview-kit";

const variants = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const;
const variantLabel: Record<(typeof variants)[number], string> = {
  default: "primary",
  secondary: "secondary",
  outline: "outline",
  ghost: "ghost",
  destructive: "danger",
  link: "link",
};

export function BaseSection() {
  const [segment, setSegment] = useState<"now" | "ai">("now");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [retrying, setRetrying] = useState(false);

  return (
    <PreviewSection
      id="base"
      title="Базові компоненти"
      description="shadcn/ui, перефарбовані токенами. Цілі натискання від 44px, фокус видно завжди: натисни Tab, щоб побачити."
    >
      <SubHeading>Button</SubHeading>
      <SpecimenGrid>
        <Specimen label="variants" wide>
          {variants.map((v) => (
            <Button key={v} variant={v}>
              {variantLabel[v]}
            </Button>
          ))}
        </Specimen>
        <Specimen label="sizes: sm, default, lg">
          <Button size="sm">Малий</Button>
          <Button>Почати урок</Button>
          <Button size="lg">Почати урок</Button>
        </Specimen>
        <Specimen label="states: hover, focus, active">
          <Button className="bg-primary/80">Hover</Button>
          <Button className="ring-3 ring-ring/60">Focus</Button>
          <Button className="translate-y-px">Active</Button>
        </Specimen>
        <Specimen label="disabled, loading">
          <Button disabled>Недоступно</Button>
          <Button loading>Зберігаю</Button>
          <Button variant="outline" loading>
            Завантажую
          </Button>
        </Specimen>
        <Specimen label="danger">
          <Button variant="destructive">
            <Trash2Icon data-icon="inline-start" aria-hidden /> Видалити файл
          </Button>
        </Specimen>
        <Specimen label="IconButton (label обовʼязковий)">
          <IconButton label="Налаштування">
            <SettingsIcon aria-hidden />
          </IconButton>
          <IconButton label="Сповіщення" variant="outline">
            <BellIcon aria-hidden />
          </IconButton>
          <IconButton label="Зберегти в обране" variant="secondary" size="icon-lg">
            <HeartIcon aria-hidden />
          </IconButton>
          <IconButton label="Недоступно" disabled>
            <SettingsIcon aria-hidden />
          </IconButton>
        </Specimen>
      </SpecimenGrid>

      <SubHeading>Поля вводу</SubHeading>
      <SpecimenGrid>
        <Specimen label="Input, default" className="flex-col items-stretch">
          <Field>
            <FieldLabel htmlFor="ds-name">Як до тебе звертатися?</FieldLabel>
            <Input id="ds-name" placeholder="Наприклад, Олена" />
            <FieldDescription>Імʼя буде на сертифікаті.</FieldDescription>
          </Field>
        </Specimen>
        <Specimen label="Input, error" className="flex-col items-stretch">
          <Field data-invalid>
            <FieldLabel htmlFor="ds-hours">Годин на тиждень</FieldLabel>
            <Input id="ds-hours" defaultValue="200" aria-invalid aria-describedby="ds-hours-err" />
            <FieldError id="ds-hours-err">У тижні лише 168 годин. Перевір число.</FieldError>
          </Field>
        </Specimen>
        <Specimen label="Input, disabled" className="flex-col items-stretch">
          <Field data-disabled>
            <FieldLabel htmlFor="ds-dis">Компанія</FieldLabel>
            <Input id="ds-dis" disabled defaultValue="Задає адміністратор" />
          </Field>
        </Specimen>
        <Specimen label="Textarea" className="flex-col items-stretch">
          <Field>
            <FieldLabel htmlFor="ds-ta">Що забирає найбільше часу?</FieldLabel>
            <Textarea id="ds-ta" placeholder="Опиши своїми словами" />
          </Field>
        </Specimen>
        <Specimen label="Select" className="flex-col items-stretch">
          <Field>
            <FieldLabel htmlFor="ds-select">Професія</FieldLabel>
            <Select defaultValue="office_manager">
              <SelectTrigger id="ds-select" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accountant">Бухгалтер</SelectItem>
                <SelectItem value="sales_manager">Менеджер з продажу</SelectItem>
                <SelectItem value="office_manager">Офіс-менеджер</SelectItem>
                <SelectItem value="teacher">Вчитель</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </Specimen>
        <Specimen label="Checkbox, Radio, Switch" className="flex-col items-stretch gap-4">
          <Field orientation="horizontal">
            <Checkbox id="ds-cb" defaultChecked />
            <FieldLabel htmlFor="ds-cb">Нагадувати про урок</FieldLabel>
          </Field>
          <Field orientation="horizontal" data-disabled>
            <Checkbox id="ds-cb2" disabled />
            <FieldLabel htmlFor="ds-cb2">Недоступно</FieldLabel>
          </Field>
          <RadioGroup defaultValue="week" aria-label="Період">
            <Field orientation="horizontal">
              <RadioGroupItem value="week" id="ds-r1" />
              <FieldLabel htmlFor="ds-r1">Щотижня</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem value="month" id="ds-r2" />
              <FieldLabel htmlFor="ds-r2">Щомісяця</FieldLabel>
            </Field>
          </RadioGroup>
          <Field orientation="horizontal">
            <Switch id="ds-sw" defaultChecked />
            <FieldLabel htmlFor="ds-sw">Темна тема як у системі</FieldLabel>
          </Field>
        </Specimen>
      </SpecimenGrid>

      <SubHeading>Навігація і вибір</SubHeading>
      <SpecimenGrid>
        <Specimen label="SegmentedControl" className="flex-col items-stretch">
          <SegmentedControl
            label="Режим карти"
            value={segment}
            onValueChange={setSegment}
            options={[
              { value: "now", label: "Зараз" },
              { value: "ai", label: "З AI" },
            ]}
          />
        </Specimen>
        <Specimen label="Tabs" className="flex-col items-stretch" wide>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Усі курси</TabsTrigger>
              <TabsTrigger value="mine">Мої</TabsTrigger>
              <TabsTrigger value="done" disabled>
                Завершені
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-2 text-base text-muted-foreground">
              Тут список усіх курсів.
            </TabsContent>
            <TabsContent value="mine" className="pt-2 text-base text-muted-foreground">
              Курси, які ти почав.
            </TabsContent>
          </Tabs>
        </Specimen>
      </SpecimenGrid>

      <SubHeading>Відображення</SubHeading>
      <SpecimenGrid>
        <Specimen label="Card" className="flex-col items-stretch">
          <Card>
            <CardHeader>
              <CardTitle>Листи клієнтам</CardTitle>
              <CardDescription>3 уроки, 25 хвилин</CardDescription>
            </CardHeader>
            <CardContent className="text-base">Відповідай на типові питання вдвічі швидше.</CardContent>
            <CardFooter>
              <Button size="sm" variant="outline">
                Відкрити курс
              </Button>
            </CardFooter>
          </Card>
        </Specimen>
        <Specimen label="Badge / Tag">
          <Badge variant="needs-you">Потребує тебе</Badge>
          <Badge variant="ai">Робить AI</Badge>
          <Badge variant="success">Завершено</Badge>
          <Badge variant="warning">Майже</Badge>
          <Badge variant="destructive">Помилка</Badge>
          <Badge variant="info">Новий урок</Badge>
          <Badge variant="streak">7 днів</Badge>
          <Badge variant="outline">Excel</Badge>
          <Badge variant="secondary">Чернетка</Badge>
        </Specimen>
        <Specimen label="Avatar, Tooltip">
          <Avatar size="lg">
            <AvatarFallback>ОК</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>ІП</AvatarFallback>
          </Avatar>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Наведи або сфокусуй</Button>
            </TooltipTrigger>
            <TooltipContent>Підказка працює і з клавіатури</TooltipContent>
          </Tooltip>
        </Specimen>
        <Specimen label="ProgressBar" className="flex-col items-stretch gap-4">
          <Progress value={0} aria-label="Прогрес курсу: 0%" />
          <Progress value={45} aria-label="Прогрес курсу: 45%" />
          <Progress value={100} aria-label="Прогрес курсу: 100%" />
        </Specimen>
        <Specimen label="Skeleton (форма кінцевого стану)" className="flex-col items-stretch">
          <div className="flex items-center gap-3">
            <Skeleton className="size-11 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
          <Skeleton className="h-24 w-full" />
        </Specimen>
        <Specimen label="Modal / BottomSheet">
          <Button variant="outline" onClick={() => setSheetOpen(true)}>
            Відкрити вікно
          </Button>
          <ResponsiveSheet
            open={sheetOpen}
            onOpenChange={setSheetOpen}
            title="Перервати урок?"
            description="Прогрес збережеться. Можна повернутися будь-коли."
            footer={
              <>
                <Button variant="outline" onClick={() => setSheetOpen(false)}>
                  Продовжити урок
                </Button>
                <Button onClick={() => setSheetOpen(false)}>Вийти з уроку</Button>
              </>
            }
          />
          <p className="w-full text-sm text-muted-foreground">На телефоні відкривається знизу.</p>
        </Specimen>
        <Specimen label="Toast">
          <Button variant="outline" onClick={() => toast.success("Зміни збережено")}>
            Успіх
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.error("Не вдалося зберегти", {
                description: "Перевір інтернет і спробуй ще раз.",
              })
            }
          >
            Помилка
          </Button>
          <Button variant="outline" onClick={() => toast.custom(() => <MilestoneToastContent days={7} />)}>
            Milestone
          </Button>
        </Specimen>
        <Specimen label="EmptyState" className="flex-col items-stretch" wide>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <EmptyState
              title="Ще немає завершених курсів"
              description="Почни з короткого уроку на 10 хвилин."
              action={<Button>Обрати урок</Button>}
            />
            <ErrorState
              onRetry={() => {
                setRetrying(true);
                setTimeout(() => setRetrying(false), 1200);
              }}
              retrying={retrying}
            />
          </div>
          <ErrorState compact title="Не вдалося завантажити відповідь" onRetry={() => undefined} />
        </Specimen>
      </SpecimenGrid>
    </PreviewSection>
  );
}
