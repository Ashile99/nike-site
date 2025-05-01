import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewsletterSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      setIsSubmitting(true);
      await apiRequest("POST", "/api/newsletter/subscribe", data);
      
      toast({
        title: "Subscribed!",
        description: "You have been successfully subscribed to our newsletter.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to subscribe",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-12 bg-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6">Subscribe to our newsletter for exclusive deals, new arrivals, and style tips.</p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input 
                        placeholder="Your email address" 
                        className="py-3 px-4 rounded-lg text-darkSlate focus:outline-none focus:ring-2 focus:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="bg-accent hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </Form>
          
          <p className="text-sm mt-4 text-gray-400">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
}
