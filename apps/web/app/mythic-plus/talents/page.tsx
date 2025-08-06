"use client";

import { dungeonsByShortName } from "@/data/dungeons";
import { talents, talentsPerClassPerDungeon } from "@/data/talents";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import Image from "next/image";
import { useState } from "react";

export default function TalentsPage() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);

  // Récupérer les classes disponibles depuis talentsPerClassPerDungeon
  const availableClasses = Object.keys(talentsPerClassPerDungeon);

  // Fonction pour obtenir les specs disponibles pour une classe
  const getSpecsForClass = (className: string) => {
    return Object.keys(talentsPerClassPerDungeon[className as keyof typeof talentsPerClassPerDungeon] || {});
  };

  // Fonction pour obtenir les donjons disponibles pour une classe et une spec
  const getDungeonsForClassAndSpec = (className: string, specName: string) => {
    if (!className || !specName) return [];
    return Object.keys(
      talentsPerClassPerDungeon[className as keyof typeof talentsPerClassPerDungeon]?.[
        specName as keyof (typeof talentsPerClassPerDungeon)[keyof typeof talentsPerClassPerDungeon]
      ] || {},
    );
  };

  // Gérer le changement de classe
  const handleClassChange = (className: string) => {
    setSelectedClass(className);
    const specs = getSpecsForClass(className);
    setSelectedSpec(specs.length > 0 ? specs[0] : null);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Talents par classe et donjon</h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sélection de classe */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Classes</CardTitle>
              <CardDescription>Sélectionnez une classe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-3">
                {availableClasses.map((className) => (
                  <div
                    key={className}
                    className={`p-3 rounded-md cursor-pointer transition-all ${
                      selectedClass === className
                        ? "bg-primary/20 border border-primary"
                        : "bg-secondary/10 hover:bg-secondary/20"
                    }`}
                    onClick={() => handleClassChange(className)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="capitalize font-medium">{className}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Affichage des spécialisations */}
          {selectedClass && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Spécialisations</CardTitle>
                <CardDescription>Choisissez une spécialisation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {getSpecsForClass(selectedClass).map((specId) => {
                    const specInfo =
                      talents[selectedClass as keyof typeof talents]?.[
                        specId as keyof (typeof talents)[keyof typeof talents]
                      ];
                    return (
                      <div
                        key={specId}
                        className={`p-3 rounded-md cursor-pointer transition-all flex flex-col items-center ${
                          selectedSpec === specId
                            ? "bg-primary/20 border border-primary"
                            : "bg-secondary/10 hover:bg-secondary/20"
                        }`}
                        onClick={() => setSelectedSpec(specId)}
                      >
                        {specInfo?.icon && (
                          <div className="relative w-12 h-12 rounded-full overflow-hidden mb-2">
                            <Image
                              src={specInfo.icon}
                              alt={specInfo.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                        )}
                        <span className="capitalize text-sm font-medium">{specInfo?.name || specId}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contenu principal */}
        <div className="md:col-span-9">
          {selectedClass && selectedSpec && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {talents[selectedClass as keyof typeof talents]?.[
                    selectedSpec as keyof (typeof talents)[keyof typeof talents]
                  ]?.icon && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={
                          talents[selectedClass as keyof typeof talents]?.[
                            selectedSpec as keyof (typeof talents)[keyof typeof talents]
                          ]?.icon || ""
                        }
                        alt={selectedSpec}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <CardTitle className="capitalize">
                      {selectedClass} -{" "}
                      {talents[selectedClass as keyof typeof talents]?.[
                        selectedSpec as keyof (typeof talents)[keyof typeof talents]
                      ]?.name || selectedSpec}
                    </CardTitle>
                    <CardDescription>Talents disponibles par donjon</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getDungeonsForClassAndSpec(selectedClass, selectedSpec).map((dungeonId) => {
                    const dungeon = dungeonsByShortName[dungeonId as keyof typeof dungeonsByShortName];
                    const talentData =
                      talentsPerClassPerDungeon[selectedClass as keyof typeof talentsPerClassPerDungeon]?.[
                        selectedSpec as keyof (typeof talentsPerClassPerDungeon)[keyof typeof talentsPerClassPerDungeon]
                      ]?.[dungeonId as keyof typeof dungeonsByShortName];

                    return (
                      <Card key={dungeonId} className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center gap-3 pb-2">
                          {dungeon?.icon_url && (
                            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                              <Image
                                src={dungeon.icon_url}
                                alt={dungeon.name}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                          )}
                          <h3 className="text-lg font-bold">{dungeon?.name}</h3>
                        </CardHeader>
                        <CardContent>
                          {talentData &&
                            Object.entries(talentData).map(([level, info]) => {
                              const talentInfo = info as {
                                heroTalent: string;
                                code: string;
                                description: string;
                              };
                              return (
                                <div key={level} className="mb-4 p-3 rounded-md bg-secondary/10">
                                  <h4 className="font-semibold mb-1">
                                    Option {level} - {talentInfo.heroTalent}
                                  </h4>
                                  <div className="p-3 rounded-md">
                                    <p className="text-sm mb-2 text-muted-foreground">{talentInfo.description}</p>
                                    <pre className="bg-secondary/20 p-2 rounded text-xs overflow-x-auto">
                                      {talentInfo.code}
                                    </pre>
                                  </div>
                                </div>
                              );
                            })}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {!selectedClass && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Veuillez sélectionner une classe pour voir les talents disponibles
                </p>
              </CardContent>
            </Card>
          )}

          {selectedClass && !selectedSpec && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Veuillez sélectionner une spécialisation pour voir les talents disponibles
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
