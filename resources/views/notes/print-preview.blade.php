<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Print Preview - {{ $note->title }}</title>
    
    <style>
        /* Reset margins for full-page printing */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
            background-color: #f5f5f5;
        }

        /* Screen-only: Preview header */
        .print-header {
            background: white;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .print-header h1 {
            font-size: 20px;
            font-weight: 600;
            color: #333;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .print-header .metadata {
            font-size: 14px;
            color: #666;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .print-header button {
            background: #4F46E5;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .print-header button:hover {
            background: #4338CA;
        }

        /* Slide container for each drawing */
        .slide-container {
            width: 100%;
            background: white;
            margin: 20px auto;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            page-break-after: always;
            page-break-inside: avoid;
            max-width: 1200px;
        }

        .slide-container:last-child {
            page-break-after: avoid;
        }

        .slide-container img {
            width: 100%;
            height: auto;
            display: block;
        }

        .slide-number {
            position: absolute;
            bottom: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 5px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Print-specific styles */
        @media print {
            /* Hide screen-only elements */
            .print-header {
                display: none !important;
            }

            html, body {
                background: white;
                margin: 0;
                padding: 0;
            }

            /* Remove page margins */
            @page {
                margin: 0;
                size: auto;
            }

            /* Full-page slides */
            .slide-container {
                width: 100vw;
                height: 100vh;
                margin: 0;
                box-shadow: none;
                max-width: none;
                page-break-after: always;
                page-break-inside: avoid;
            }

            .slide-container:last-child {
                page-break-after: avoid;
            }

            .slide-container img {
                max-width: 100%;
                max-height: 100%;
                width: auto;
                height: auto;
                object-fit: contain;
            }

            .slide-number {
                display: none;
            }

            /* Ensure colors print correctly */
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
    </style>
</head>
<body>

    <!-- Screen-only header -->
    <div class="print-header">
        <div>
            <h1>{{ $note->title ?? 'Untitled Note' }}</h1>
            <div class="metadata">
                @if($note->project)
                    Project: {{ $note->project->name }}
                    @if($note->task)
                        / Task: {{ $note->task->title }}
                    @endif
                @endif
            </div>
        </div>
        <button onclick="window.print()">Print</button>
    </div>

    <!-- Drawing slides -->
    @if(!empty($images))
        @foreach($images as $index => $img)
            <div class="slide-container">
                <img src="{{ $img }}" alt="Drawing {{ $index + 1 }}" />
                <div class="slide-number">
                    {{ $index + 1 }} / {{ count($images) }}
                </div>
            </div>
        @endforeach
    @else
        <div style="padding: 40px; text-align: center; font-family: sans-serif; color: #666;">
            No drawings to print.
        </div>
    @endif

    <script>
        // Auto-trigger print dialog on page load
        window.addEventListener('load', function() {
            // Small delay to ensure images are loaded
            setTimeout(function() {
                window.print();
            }, 500);
        });

        // Close window after printing or canceling
        window.addEventListener('afterprint', function() {
            // Optional: close the window after printing
            // window.close();
        });
    </script>

</body>
</html>
