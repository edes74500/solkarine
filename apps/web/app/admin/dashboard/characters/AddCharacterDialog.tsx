import { fetchRaiderCharacter } from "@/lib/api/Raider.io";
import { useCreateCharacterMutation } from "@/redux/api/character.apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { RaiderioCharacter } from "@repo/types";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const characterSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  server: z.string().min(2, "Le nom du serveur doit contenir au moins 2 caractères"),
  region: z.enum(["eu", "na"], {
    required_error: "Veuillez sélectionner une région",
  }),
});

type CharacterForm = z.infer<typeof characterSchema>;

interface AddCharacterDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  //   onSubmit?: (data: CharacterForm) => Promise<void>;
}

export function AddCharacterDialog({ dialogOpen, setDialogOpen }: AddCharacterDialogProps) {
  const [createCharacter] = useCreateCharacterMutation();
  const form = useForm<CharacterForm>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: "",
      server: "",
      region: "eu",
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (data: CharacterForm) => {
    try {
      setIsLoading(true);
      const json: RaiderioCharacter = await fetchRaiderCharacter(data.region, data.server, data.name);
      console.log(json);
      const character = await createCharacter({
        name: data.name,
        server: data.server,
        region: data.region,
        raiderIo_link: json.profile_url,
      });
      if (character.error) {
        toast.error("Erreur lors de l'ajout du personnage");
      } else {
        toast.success("Personnage ajouté avec succès");
      }
      setIsLoading(false);
      form.reset();
      setDialogOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'ajout du personnage:", error);
      toast.error("Erreur lors de l'ajout du personnage");
    } finally {
      setIsLoading(false);
      // Recharger la page pour afficher le nouveau personnage
    }
  };

  const handleCancel = () => {
    form.reset();
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un personnage</DialogTitle>
          <DialogDescription>Entrez les informations du personnage que vous souhaitez ajouter.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du personnage</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Entrez le nom du personnage" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="server"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serveur</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Entrez le nom du serveur" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Région</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une région" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="eu">Europe (EU)</SelectItem>
                      <SelectItem value="na">Amérique du Nord (NA)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Ajouter
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
