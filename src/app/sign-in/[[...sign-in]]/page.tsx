import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn
        // appearance={{
        //   elements: {
        //     rootBox: "mx-auto w-full max-w-md bg-background text-foreground",
        //     card: "bg-background text-foreground",
        //     header: "text-foreground bg-background text-foreground",
        //     signInStart: "bg-background text-foreground",
        //     headerTitle: "text-foreground text-2xl font-semibold bg-background text-foreground",
        //     headerSubtitle: "text-muted-foreground bg-background text-foreground",
        //     socialButtonsBlockButton: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border",
        //     socialButtonsBlockButtonText: "text-secondary-foreground",
        //     formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
        //     formFieldInput: "bg-background text-foreground border-border focus:border-ring focus:ring-ring/50",
        //     formFieldLabel: "text-foreground",
        //     formFieldHint: "text-muted-foreground",
        //     footerActionLink: "text-primary hover:text-primary/90",
        //     identityPreviewText: "text-foreground",
        //     identityPreviewEditButton: "text-muted-foreground hover:text-foreground",
        //     formFieldAction: "text-primary hover:text-primary/90",
        //     alertText: "text-destructive",
        //     alertIcon: "text-destructive",
        //     dividerLine: "bg-border",
        //     dividerText: "text-muted-foreground",
        //     formResendCodeLink: "text-primary hover:text-primary/90",
        //     otpCodeFieldInput: "bg-background text-foreground border-border focus:border-ring focus:ring-ring/50",
        //     userPreview: "text-foreground",
        //     userPreviewTextContainer: "text-foreground",
        //     userButtonPopoverCard: "bg-card text-card-foreground border-border shadow-sm",
        //     userButtonPopoverActionButton: "text-foreground hover:bg-accent hover:text-accent-foreground",
        //     userButtonPopoverActionButtonText: "text-foreground",
        //     userButtonPopoverFooter: "text-muted-foreground",
        //     userButtonPopoverFooterAction: "text-primary hover:text-primary/90",
        //   },
        // }}
      />
    </div>
  );
}
