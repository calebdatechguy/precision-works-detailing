import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Bold, Italic, Underline, AlertCircle, Terminal, ChevronDown } from 'lucide-react'

const COLORS = [
  { label: 'Background', cls: 'bg-background' },
  { label: 'Foreground', cls: 'bg-foreground' },
  { label: 'Card', cls: 'bg-card' },
  { label: 'Card Foreground', cls: 'bg-card-foreground' },
  { label: 'Primary', cls: 'bg-primary' },
  { label: 'Primary Foreground', cls: 'bg-primary-foreground' },
  { label: 'Secondary', cls: 'bg-secondary' },
  { label: 'Secondary Foreground', cls: 'bg-secondary-foreground' },
  { label: 'Muted', cls: 'bg-muted' },
  { label: 'Muted Foreground', cls: 'bg-muted-foreground' },
  { label: 'Accent', cls: 'bg-accent' },
  { label: 'Accent Foreground', cls: 'bg-accent-foreground' },
  { label: 'Destructive', cls: 'bg-destructive' },
  { label: 'Destructive Foreground', cls: 'bg-destructive-foreground' },
]

const VARIANTS = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
const SIZES = ['default', 'sm', 'lg'] as const

export function ShowcasePage() {
  const [switchOn, setSwitchOn] = useState(false)
  const [sliderVal, setSliderVal] = useState([50])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Component Showcase</h1>

      <Tabs defaultValue="colors">
        <TabsList className="mb-8 flex-wrap h-auto gap-1">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="data">Data Display</TabsTrigger>
          <TabsTrigger value="overlays">Overlays</TabsTrigger>
        </TabsList>

        {/* ── Colors ── */}
        <TabsContent value="colors">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {COLORS.map((c) => (
              <div key={c.label} className="space-y-1.5">
                <div className={cn('h-16 rounded-md border', c.cls)} />
                <p className="text-xs font-medium">{c.label}</p>
              </div>
            ))}
            <div className="space-y-1.5">
              <div className="h-16 rounded-md border-2 border-border" />
              <p className="text-xs font-medium">Border</p>
            </div>
            <div className="space-y-1.5">
              <div className="h-16 rounded-md border-2 border-input" />
              <p className="text-xs font-medium">Input</p>
            </div>
            <div className="space-y-1.5">
              <div className="h-16 rounded-md border ring-2 ring-ring" />
              <p className="text-xs font-medium">Ring</p>
            </div>
          </div>
        </TabsContent>

        {/* ── Typography ── */}
        <TabsContent value="typography">
          <div className="space-y-6">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Heading 1</h1>
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">Heading 2</h2>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Heading 3</h3>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Heading 4</h4>
            <p className="text-xl text-muted-foreground">Lead text — larger and muted for introductions.</p>
            <p className="leading-7">This is a paragraph with standard line height for comfortable reading. It demonstrates the default body text styling used throughout the application.</p>
            <p className="text-lg font-semibold">Large text</p>
            <p className="text-sm text-muted-foreground">Small muted text</p>
            <p><code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">Inline code</code></p>
          </div>
        </TabsContent>

        {/* ── Buttons ── */}
        <TabsContent value="buttons">
          <div className="space-y-4">
            {VARIANTS.map((v) => (
              <div key={v} className="flex flex-wrap items-center gap-3">
                <span className="w-24 text-sm text-muted-foreground capitalize">{v}</span>
                {SIZES.map((s) => (
                  <Button key={s} variant={v} size={s} className="capitalize">{s}</Button>
                ))}
                <Button variant={v} size="icon"><ChevronDown className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ── Forms ── */}
        <TabsContent value="forms">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="demo-input">Input</Label>
              <Input id="demo-input" placeholder="Type something..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-textarea">Textarea</Label>
              <Textarea id="demo-textarea" placeholder="Write a message..." />
            </div>
            <div className="space-y-2">
              <Label>Select</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Pick an option" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="one">Option One</SelectItem>
                  <SelectItem value="two">Option Two</SelectItem>
                  <SelectItem value="three">Option Three</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Checkbox</Label>
              <div className="flex items-center gap-2">
                <Checkbox id="demo-check" />
                <Label htmlFor="demo-check" className="font-normal">Accept terms and conditions</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Radio Group</Label>
              <RadioGroup defaultValue="one">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="one" id="r1" />
                  <Label htmlFor="r1" className="font-normal">Option One</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="two" id="r2" />
                  <Label htmlFor="r2" className="font-normal">Option Two</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Switch</Label>
              <div className="flex items-center gap-2">
                <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
                <span className="text-sm">{switchOn ? 'On' : 'Off'}</span>
              </div>
            </div>
            <div className="space-y-2 md:col-span-2 max-w-sm">
              <Label>Slider</Label>
              <Slider value={sliderVal} onValueChange={setSliderVal} max={100} step={1} />
              <p className="text-sm text-muted-foreground">Value: {sliderVal[0]}</p>
            </div>
          </div>
        </TabsContent>

        {/* ── Data Display ── */}
        <TabsContent value="data">
          <div className="space-y-8">
            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Card</h3>
              <Card className="max-w-sm">
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description text.</CardDescription>
                </CardHeader>
                <CardContent><p className="text-sm">Card content goes here.</p></CardContent>
                <CardFooter><Button size="sm">Action</Button></CardFooter>
              </Card>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Badge</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Table</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Alice</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Admin</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bob</TableCell>
                    <TableCell>Inactive</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Avatar</h3>
              <div className="flex gap-4">
                <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
                <Avatar><AvatarFallback>CD</AvatarFallback></Avatar>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Progress</h3>
              <Progress value={66} className="max-w-sm" />
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Separator</h3>
              <Separator />
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Skeleton</h3>
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Alert</h3>
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>This is an informational alert.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong.</AlertDescription>
              </Alert>
            </section>
          </div>
        </TabsContent>

        {/* ── Overlays ── */}
        <TabsContent value="overlays">
          <div className="space-y-8">
            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Dialog</h3>
              <Dialog>
                <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>This is a dialog description.</DialogDescription>
                  </DialogHeader>
                  <p className="text-sm">Dialog body content goes here.</p>
                  <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Alert Dialog</h3>
              <AlertDialog>
                <AlertDialogTrigger asChild><Button variant="outline">Open Alert Dialog</Button></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Sheet</h3>
              <Sheet>
                <SheetTrigger asChild><Button variant="outline">Open Sheet</Button></SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Sheet Title</SheetTitle>
                    <SheetDescription>Sheet description text.</SheetDescription>
                  </SheetHeader>
                  <p className="py-4 text-sm">Sheet content goes here.</p>
                </SheetContent>
              </Sheet>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Dropdown Menu</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="outline">Open Menu</Button></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Accordion</h3>
              <Accordion type="single" collapsible className="max-w-sm">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Section One</AccordionTrigger>
                  <AccordionContent>Content for section one.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Section Two</AccordionTrigger>
                  <AccordionContent>Content for section two.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Tooltip</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger>
                  <TooltipContent><p>Tooltip content</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Popover</h3>
              <Popover>
                <PopoverTrigger asChild><Button variant="outline">Open Popover</Button></PopoverTrigger>
                <PopoverContent><p className="text-sm">Popover content goes here.</p></PopoverContent>
              </Popover>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Hover Card</h3>
              <HoverCard>
                <HoverCardTrigger asChild><Button variant="link">Hover me</Button></HoverCardTrigger>
                <HoverCardContent><p className="text-sm">Hover card content with extra information.</p></HoverCardContent>
              </HoverCard>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Toggle</h3>
              <Toggle aria-label="Toggle bold"><Bold className="h-4 w-4" /></Toggle>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Toggle Group</h3>
              <ToggleGroup type="multiple">
                <ToggleGroupItem value="bold" aria-label="Toggle bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
              </ToggleGroup>
            </section>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
