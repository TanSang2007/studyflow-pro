import java.util.Random;

public class SortComparison {

    // Insertion Sort
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {

            int key = arr[i];
            int j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }

            arr[j + 1] = key;
        }
    }

    // Selection Sort
    public static void selectionSort(int[] arr) {

        for (int i = 0; i < arr.length - 1; i++) {

            int min = i;

            for (int j = i + 1; j < arr.length; j++) {

                if (arr[j] < arr[min]) {
                    min = j;
                }
            }

            int temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }

    // Bubble Sort
    public static void bubbleSort(int[] arr) {

        for (int i = 0; i < arr.length - 1; i++) {

            for (int j = 0; j < arr.length - i - 1; j++) {

                if (arr[j] > arr[j + 1]) {

                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    // Quick Sort
    public static void quickSort(int[] arr, int low, int high) {

        if (low < high) {

            int pi = partition(arr, low, high);

            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    public static int partition(int[] arr, int low, int high) {

        int pivot = arr[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {

            if (arr[j] < pivot) {

                i++;

                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1;
    }

    // Merge Sort
    public static void mergeSort(int[] arr, int left, int right) {

        if (left < right) {

            int mid = (left + right) / 2;

            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);

            merge(arr, left, mid, right);
        }
    }

    public static void merge(int[] arr, int left, int mid, int right) {

        int n1 = mid - left + 1;
        int n2 = right - mid;

        int[] L = new int[n1];
        int[] R = new int[n2];

        for (int i = 0; i < n1; i++) {
            L[i] = arr[left + i];
        }

        for (int j = 0; j < n2; j++) {
            R[j] = arr[mid + 1 + j];
        }

        int i = 0;
        int j = 0;
        int k = left;

        while (i < n1 && j < n2) {

            if (L[i] <= R[j]) {

                arr[k] = L[i];
                i++;

            } else {

                arr[k] = R[j];
                j++;
            }

            k++;
        }

        while (i < n1) {

            arr[k] = L[i];
            i++;
            k++;
        }

        while (j < n2) {

            arr[k] = R[j];
            j++;
            k++;
        }
    }

    // Create random array
    public static int[] createRandomArray(int n) {

        Random rd = new Random();

        int[] arr = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = rd.nextInt(100000);
        }

        return arr;
    }

    // Copy array
    public static int[] copyArray(int[] arr) {

        int[] newArr = new int[arr.length];

        for (int i = 0; i < arr.length; i++) {
            newArr[i] = arr[i];
        }

        return newArr;
    }

    public static void main(String[] args) {

        int[] sizes = {1000, 5000, 10000, 25000, 50000};

        System.out.println("-----------------------------------------------------------");
        System.out.println("n\tInsertion\tSelection\tBubble\tQuick\tMerge");
        System.out.println("-----------------------------------------------------------");

        for (int n : sizes) {

            int[] original = createRandomArray(n);

            // Insertion Sort
            int[] arr1 = copyArray(original);

            long start = System.nanoTime();
            insertionSort(arr1);
            long end = System.nanoTime();

            double insertionTime = (end - start) / 1000000.0;

            // Selection Sort
            int[] arr2 = copyArray(original);

            start = System.nanoTime();
            selectionSort(arr2);
            end = System.nanoTime();

            double selectionTime = (end - start) / 1000000.0;

            // Bubble Sort
            int[] arr3 = copyArray(original);

            start = System.nanoTime();
            bubbleSort(arr3);
            end = System.nanoTime();

            double bubbleTime = (end - start) / 1000000.0;

            // Quick Sort
            int[] arr4 = copyArray(original);

            start = System.nanoTime();
            quickSort(arr4, 0, arr4.length - 1);
            end = System.nanoTime();

            double quickTime = (end - start) / 1000000.0;

            // Merge Sort
            int[] arr5 = copyArray(original);

            start = System.nanoTime();
            mergeSort(arr5, 0, arr5.length - 1);
            end = System.nanoTime();

            double mergeTime = (end - start) / 1000000.0;

            // Print result
            System.out.printf(
                    "%d\t%.3f\t\t%.3f\t\t%.3f\t%.3f\t%.3f\n",
                    n,
                    insertionTime,
                    selectionTime,
                    bubbleTime,
                    quickTime,
                    mergeTime
            );
        }
    }
}