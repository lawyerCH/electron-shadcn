/**
 * Component showcase — live examples of all shadcn/ui components installed
 * in this template. Use as a copy-paste reference when building new UI.
 *
 * Organized by category via Tabs. Each section is small and self-contained.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Info,
  Mail,
  TriangleAlert,
  User,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/renderer/components/ui/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/renderer/components/ui/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/renderer/components/ui/avatar";
import { Badge } from "@/renderer/components/ui/badge";
import { Button } from "@/renderer/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/renderer/components/ui/card";
import { Checkbox } from "@/renderer/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/renderer/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/renderer/components/ui/dropdown-menu";
import { Input } from "@/renderer/components/ui/input";
import { Label } from "@/renderer/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/renderer/components/ui/popover";
import { Progress } from "@/renderer/components/ui/progress";
import { ScrollArea } from "@/renderer/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/renderer/components/ui/select";
import { Separator } from "@/renderer/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/renderer/components/ui/sheet";
import { Skeleton } from "@/renderer/components/ui/skeleton";
import { Switch } from "@/renderer/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/renderer/components/ui/tabs";
import { Textarea } from "@/renderer/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/renderer/components/ui/tooltip";

export const Route = createFileRoute("/components")({
  component: ComponentsShowcase,
});

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="font-semibold text-xl">{title}</h2>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </div>
      <div className="rounded-lg border bg-card p-6">{children}</div>
    </section>
  );
}

function ComponentsShowcase() {
  const [progress] = useState(66);
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-4xl space-y-10 p-8">
      <header className="space-y-2">
        <h1 className="font-bold text-3xl">{t("showcaseTitle")}</h1>
        <p className="text-muted-foreground">{t("showcaseDescription")}</p>
      </header>

      <Tabs defaultValue="buttons">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="buttons">{t("showcaseTabButtons")}</TabsTrigger>
          <TabsTrigger value="forms">{t("showcaseTabForms")}</TabsTrigger>
          <TabsTrigger value="display">{t("showcaseTabDisplay")}</TabsTrigger>
          <TabsTrigger value="feedback">{t("showcaseTabFeedback")}</TabsTrigger>
          <TabsTrigger value="overlays">{t("showcaseTabOverlays")}</TabsTrigger>
          <TabsTrigger value="navigation">
            {t("showcaseTabNavigation")}
          </TabsTrigger>
        </TabsList>

        {/* ───── Buttons ───── */}
        <TabsContent className="space-y-6" value="buttons">
          <Section title="Variants">
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </Section>

          <Section title="Sizes">
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Mail />
              </Button>
            </div>
          </Section>

          <Section title="With icon">
            <div className="flex flex-wrap gap-2">
              <Button>
                <CheckCircle2 /> Continue
              </Button>
              <Button variant="outline">
                Learn more <ArrowRight />
              </Button>
            </div>
          </Section>
        </TabsContent>

        {/* ───── Forms ───── */}
        <TabsContent className="space-y-6" value="forms">
          <Section title="Input">
            <div className="grid max-w-sm gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="you@example.com" type="email" />
            </div>
          </Section>

          <Section title="Textarea">
            <div className="grid max-w-sm gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Write something..." />
            </div>
          </Section>

          <Section title="Checkbox">
            <div className="flex items-center gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
          </Section>

          <Section title="Switch">
            <div className="flex items-center gap-2">
              <Switch id="airplane" />
              <Label htmlFor="airplane">Airplane mode</Label>
            </div>
          </Section>

          <Section title="Select">
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="cherry">Cherry</SelectItem>
              </SelectContent>
            </Select>
          </Section>
        </TabsContent>

        {/* ───── Display ───── */}
        <TabsContent className="space-y-6" value="display">
          <Section title="Card">
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>Card title</CardTitle>
                <CardDescription>Card description goes here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card body content. Pair with header / footer as needed.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Action</Button>
              </CardFooter>
            </Card>
          </Section>

          <Section title="Badge">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </Section>

          <Section title="Separator">
            <div className="space-y-2">
              <p>Above separator</p>
              <Separator />
              <p>Below separator</p>
            </div>
          </Section>

          <Section title="Avatar">
            <div className="flex flex-wrap items-center gap-4">
              <Avatar>
                <AvatarImage alt="user" src="https://github.com/lawyerch.png" />
                <AvatarFallback>LC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage alt="" src="" />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </div>
          </Section>

          <Section title="ScrollArea">
            <ScrollArea className="h-32 w-72 rounded-md border p-3">
              {Array.from({ length: 20 }, (_, i) => `Line ${i + 1}`).map(
                (text) => (
                  <p className="py-1 text-sm" key={text}>
                    {text}
                  </p>
                )
              )}
            </ScrollArea>
          </Section>
        </TabsContent>

        {/* ───── Feedback ───── */}
        <TabsContent className="space-y-6" value="feedback">
          <Section title="Alert">
            <div className="space-y-3">
              <Alert>
                <Info />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  You can add components to your app using the CLI.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <TriangleAlert />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Your session has expired. Please log in again.
                </AlertDescription>
              </Alert>
            </div>
          </Section>

          <Section title="Progress">
            <div className="space-y-2">
              <Progress value={progress} />
              <p className="text-muted-foreground text-xs">{progress}%</p>
            </div>
          </Section>

          <Section title="Skeleton">
            <div className="flex items-center gap-3">
              <Skeleton className="size-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </Section>
        </TabsContent>

        {/* ───── Overlays ───── */}
        <TabsContent className="space-y-6" value="overlays">
          <Section title="Dialog">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit">Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Section>

          <Section title="Sheet">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </Section>

          <Section title="Popover">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open popover</Button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <p className="text-sm">
                  Popover content floats next to trigger.
                </p>
              </PopoverContent>
            </Popover>
          </Section>

          <Section title="Tooltip">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tooltip text</p>
              </TooltipContent>
            </Tooltip>
          </Section>

          <Section title="Dropdown Menu">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Section>
        </TabsContent>

        {/* ───── Navigation ───── */}
        <TabsContent className="space-y-6" value="navigation">
          <Section title="Accordion">
            <Accordion collapsible type="single">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is this project?</AccordionTrigger>
                <AccordionContent>
                  An Electron Forge + Vite + React 19 + shadcn/ui desktop
                  template.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I add components?</AccordionTrigger>
                <AccordionContent>
                  Run <code>npm run bump-ui</code> to refresh existing, or{" "}
                  <code>npx shadcn add &lt;name&gt;</code> for new ones.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Where is the source?</AccordionTrigger>
                <AccordionContent>
                  Everything lives in <code>src/renderer/</code>; shadcn
                  components are under <code>src/renderer/components/ui/</code>.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>
        </TabsContent>
      </Tabs>

      <footer className="border-t pt-6 text-center text-muted-foreground text-sm">
        <Link className="hover:underline" to="/">
          ← {t("titleHomePage")}
        </Link>
      </footer>
    </div>
  );
}
