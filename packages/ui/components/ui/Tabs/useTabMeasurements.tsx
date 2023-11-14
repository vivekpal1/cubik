import { useEffect, useState } from 'react';

type Measurements = {
  left: number;
  width: number;
};

// This hook returns the left offset and the width of the tab element, which is needed for the indicator style
export function useTabMeasurements(
  tabRefs: (HTMLElement | null)[],
  tabListContainerRef: HTMLDivElement | null,
): Measurements[] {
  const [measurements, setMeasurements] = useState<Measurements[]>(
    tabRefs.map(() => ({ left: 0, width: 0 })),
  );

  useEffect(() => {
    if (!tabListContainerRef) return;

    // Calculate and set the initial measurements
    const updateMeasurements = () => {
      const containerRect = tabListContainerRef.getBoundingClientRect();

      const newMeasurements = tabRefs.map((tabRef) => {
        if (tabRef) {
          const tabRect = tabRef.getBoundingClientRect();
          // Subtract the container's left from the tab's left to get the relative position
          const left = tabRect.left - containerRect.left;
          const { width } = tabRect;
          return { left, width };
        }
        return { left: 0, width: 0 };
      });

      setMeasurements(newMeasurements);
    };

    // Create an observer to re-measure when tabs resize
    const observer = new ResizeObserver(updateMeasurements);

    // Observe each tab ref
    tabRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Call update measurements to set the initial measurements
    updateMeasurements();

    return () => {
      observer.disconnect();
    };
  }, [tabRefs, tabListContainerRef]); // Depend on both the tabRefs and the container ref

  return measurements;
}
