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
      title="Base components"
      description="shadcn/ui, recolored with tokens. Tap targets from 44px, focus always visible: press Tab to see it."
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
          <Button size="sm">Small</Button>
          <Button>Start lesson</Button>
          <Button size="lg">Start lesson</Button>
        </Specimen>
        <Specimen label="states: hover, focus, active">
          <Button className="bg-primary/80">Hover</Button>
          <Button className="ring-3 ring-ring/60">Focus</Button>
          <Button className="translate-y-px">Active</Button>
        </Specimen>
        <Specimen label="disabled, loading">
          <Button disabled>Unavailable</Button>
          <Button loading>Saving</Button>
          <Button variant="outline" loading>
            Uploading
          </Button>
        </Specimen>
        <Specimen label="danger">
          <Button variant="destructive">
            <Trash2Icon data-icon="inline-start" aria-hidden /> Delete file
          </Button>
        </Specimen>
        <Specimen label="IconButton (label is required)">
          <IconButton label="Settings">
            <SettingsIcon aria-hidden />
          </IconButton>
          <IconButton label="Notifications" variant="outline">
            <BellIcon aria-hidden />
          </IconButton>
          <IconButton label="Add to favorites" variant="secondary" size="icon-lg">
            <HeartIcon aria-hidden />
          </IconButton>
          <IconButton label="Unavailable" disabled>
            <SettingsIcon aria-hidden />
          </IconButton>
        </Specimen>
      </SpecimenGrid>

      <SubHeading>Inputs</SubHeading>
      <SpecimenGrid>
        <Specimen label="Input, default" className="flex-col items-stretch">
          <Field>
            <FieldLabel htmlFor="ds-name">What should we call you?</FieldLabel>
            <Input id="ds-name" placeholder="For example, Emma" />
            <FieldDescription>Your name will appear on the certificate.</FieldDescription>
          </Field>
        </Specimen>
        <Specimen label="Input, error" className="flex-col items-stretch">
          <Field data-invalid>
            <FieldLabel htmlFor="ds-hours">Hours per week</FieldLabel>
            <Input id="ds-hours" defaultValue="200" aria-invalid aria-describedby="ds-hours-err" />
            <FieldError id="ds-hours-err">A week has only 168 hours. Check the number.</FieldError>
          </Field>
        </Specimen>
        <Specimen label="Input, disabled" className="flex-col items-stretch">
          <Field data-disabled>
            <FieldLabel htmlFor="ds-dis">Company</FieldLabel>
            <Input id="ds-dis" disabled defaultValue="Set by an admin" />
          </Field>
        </Specimen>
        <Specimen label="Textarea" className="flex-col items-stretch">
          <Field>
            <FieldLabel htmlFor="ds-ta">What takes the most time?</FieldLabel>
            <Textarea id="ds-ta" placeholder="Describe in your own words" />
          </Field>
        </Specimen>
        <Specimen label="Select" className="flex-col items-stretch">
          <Field>
            <FieldLabel htmlFor="ds-select">Profession</FieldLabel>
            <Select defaultValue="office_manager">
              <SelectTrigger id="ds-select" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accountant">Accountant</SelectItem>
                <SelectItem value="sales_manager">Sales manager</SelectItem>
                <SelectItem value="office_manager">Office manager</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </Specimen>
        <Specimen label="Checkbox, Radio, Switch" className="flex-col items-stretch gap-4">
          <Field orientation="horizontal">
            <Checkbox id="ds-cb" defaultChecked />
            <FieldLabel htmlFor="ds-cb">Remind me about lessons</FieldLabel>
          </Field>
          <Field orientation="horizontal" data-disabled>
            <Checkbox id="ds-cb2" disabled />
            <FieldLabel htmlFor="ds-cb2">Unavailable</FieldLabel>
          </Field>
          <RadioGroup defaultValue="week" aria-label="Period">
            <Field orientation="horizontal">
              <RadioGroupItem value="week" id="ds-r1" />
              <FieldLabel htmlFor="ds-r1">Weekly</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem value="month" id="ds-r2" />
              <FieldLabel htmlFor="ds-r2">Monthly</FieldLabel>
            </Field>
          </RadioGroup>
          <Field orientation="horizontal">
            <Switch id="ds-sw" defaultChecked />
            <FieldLabel htmlFor="ds-sw">Dark theme follows the system</FieldLabel>
          </Field>
        </Specimen>
      </SpecimenGrid>

      <SubHeading>Navigation and selection</SubHeading>
      <SpecimenGrid>
        <Specimen label="SegmentedControl" className="flex-col items-stretch">
          <SegmentedControl
            label="Map mode"
            value={segment}
            onValueChange={setSegment}
            options={[
              { value: "now", label: "Now" },
              { value: "ai", label: "With AI" },
            ]}
          />
        </Specimen>
        <Specimen label="Tabs" className="flex-col items-stretch" wide>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All courses</TabsTrigger>
              <TabsTrigger value="mine">Mine</TabsTrigger>
              <TabsTrigger value="done" disabled>
                Completed
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-2 text-base text-muted-foreground">
              The list of all courses goes here.
            </TabsContent>
            <TabsContent value="mine" className="pt-2 text-base text-muted-foreground">
              Courses you have started.
            </TabsContent>
          </Tabs>
        </Specimen>
      </SpecimenGrid>

      <SubHeading>Display</SubHeading>
      <SpecimenGrid>
        <Specimen label="Card" className="flex-col items-stretch">
          <Card>
            <CardHeader>
              <CardTitle>Emails to clients</CardTitle>
              <CardDescription>3 lessons, 25 minutes</CardDescription>
            </CardHeader>
            <CardContent className="text-base">Answer routine questions twice as fast.</CardContent>
            <CardFooter>
              <Button size="sm" variant="outline">
                Open course
              </Button>
            </CardFooter>
          </Card>
        </Specimen>
        <Specimen label="Badge / Tag">
          <Badge variant="needs-you">Needs you</Badge>
          <Badge variant="ai">AI does it</Badge>
          <Badge variant="success">Completed</Badge>
          <Badge variant="warning">Almost</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="info">New lesson</Badge>
          <Badge variant="streak">7 days</Badge>
          <Badge variant="outline">Excel</Badge>
          <Badge variant="secondary">Draft</Badge>
        </Specimen>
        <Specimen label="Avatar, Tooltip">
          <Avatar size="lg">
            <AvatarFallback>EC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover or focus</Button>
            </TooltipTrigger>
            <TooltipContent>The tooltip also works with the keyboard</TooltipContent>
          </Tooltip>
        </Specimen>
        <Specimen label="ProgressBar" className="flex-col items-stretch gap-4">
          <Progress value={0} aria-label="Course progress: 0%" />
          <Progress value={45} aria-label="Course progress: 45%" />
          <Progress value={100} aria-label="Course progress: 100%" />
        </Specimen>
        <Specimen label="Skeleton (shape of the final state)" className="flex-col items-stretch">
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
            Open dialog
          </Button>
          <ResponsiveSheet
            open={sheetOpen}
            onOpenChange={setSheetOpen}
            title="Leave the lesson?"
            description="Your progress is saved. You can come back any time."
            footer={
              <>
                <Button variant="outline" onClick={() => setSheetOpen(false)}>
                  Continue lesson
                </Button>
                <Button onClick={() => setSheetOpen(false)}>Leave lesson</Button>
              </>
            }
          />
          <p className="w-full text-sm text-muted-foreground">On a phone it opens from the bottom.</p>
        </Specimen>
        <Specimen label="Toast">
          <Button variant="outline" onClick={() => toast.success("Changes saved")}>
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.error("Couldn't save", {
                description: "Check your connection and try again.",
              })
            }
          >
            Error
          </Button>
          <Button variant="outline" onClick={() => toast.custom(() => <MilestoneToastContent days={7} />)}>
            Milestone
          </Button>
        </Specimen>
        <Specimen label="EmptyState" className="flex-col items-stretch" wide>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <EmptyState
              title="No completed courses yet"
              description="Start with a short 10-minute lesson."
              action={<Button>Choose a lesson</Button>}
            />
            <ErrorState
              onRetry={() => {
                setRetrying(true);
                setTimeout(() => setRetrying(false), 1200);
              }}
              retrying={retrying}
            />
          </div>
          <ErrorState compact title="Couldn't load the answer" onRetry={() => undefined} />
        </Specimen>
      </SpecimenGrid>
    </PreviewSection>
  );
}
