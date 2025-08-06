import { legalService } from '@/lib/api/legalService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function PrivacyPage() {
  const privacyContent = await legalService.getPrivacy();

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[70vh] w-full">
            <div
              className="prose dark:prose-invert p-4"
              dangerouslySetInnerHTML={{ __html: privacyContent }}
            />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
