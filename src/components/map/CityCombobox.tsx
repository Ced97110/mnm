"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CITIES_BY_REGION, type City } from "@/lib/cities";

interface CityComboboxProps {
  selectedCity: City | null;
  onCitySelect: (city: City) => void;
}

export function CityCombobox({ selectedCity, onCitySelect }: CityComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a city"
          className="w-full justify-between h-12 text-left font-normal"
        >
          <span className="flex items-center gap-2 truncate">
            <MapPin className="h-4 w-4 shrink-0 text-gold" />
            {selectedCity ? (
              <span>{selectedCity.name}</span>
            ) : (
              <span className="text-muted-foreground">Select your city...</span>
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search cities..." />
          <CommandList>
            <CommandEmpty>
              <div className="py-4 px-2 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  City not found in my service area
                </p>
                <p className="text-xs text-muted-foreground">
                  Contact us—service may be available!
                </p>
              </div>
            </CommandEmpty>
            {Object.entries(CITIES_BY_REGION).map(([region, cities]) => (
              <CommandGroup key={region} heading={region}>
                {cities.map((city) => (
                  <CommandItem
                    key={city.slug}
                    value={city.name}
                    onSelect={() => {
                      onCitySelect(city);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCity?.slug === city.slug
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {city.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
