#include <pebble.h>

#define SETTING_1 1
#define SETTING_2 2
#define SETTING_3 3

Window *my_window;
TextLayer *text_layer;

static void inbox_received_callback(DictionaryIterator *iterator, void *context) {
    // Read first item
    Tuple *t = dict_read_first(iterator);
    // For all items
    while(t != NULL) {
        // Which key was received?
        switch(t->key) {
            case SETTING_1:
                APP_LOG(APP_LOG_LEVEL_INFO, "SETTING_1: %d", (int)t->value->int32);
                break;
            case SETTING_2:
                APP_LOG(APP_LOG_LEVEL_INFO, "SETTING_2: %d", (int)t->value->int32);
                break;
            case SETTING_3:
                APP_LOG(APP_LOG_LEVEL_INFO, "SETTING_3: %d", (int)t->value->int32);
                break;
            default:
                APP_LOG(APP_LOG_LEVEL_ERROR, "Key %d not recognized!", (int)t->key);
                break;

        }
        // Look for next item
        t = dict_read_next(iterator);
    }
}




static void inbox_dropped_callback(AppMessageResult reason, void *context) {
    APP_LOG(APP_LOG_LEVEL_ERROR, "Message dropped!");
}

static void outbox_failed_callback(DictionaryIterator *iterator, AppMessageResult reason, void *context) {
    APP_LOG(APP_LOG_LEVEL_ERROR, "Outbox send failed!");
}

static void outbox_sent_callback(DictionaryIterator *iterator, void *context) {
    APP_LOG(APP_LOG_LEVEL_INFO, "Outbox send success!");
}

void init(void) {
    my_window = window_create();

    text_layer = text_layer_create(GRect(0, 0, 144, 20));
    window_stack_push(my_window, true);

    // Register callbacks
    app_message_register_inbox_received(inbox_received_callback);
    app_message_register_inbox_dropped(inbox_dropped_callback);
    app_message_register_outbox_failed(outbox_failed_callback);
    app_message_register_outbox_sent(outbox_sent_callback);

    // Open AppMessage
    app_message_open(app_message_inbox_size_maximum(), app_message_outbox_size_maximum());
}

void deinit(void) {
    text_layer_destroy(text_layer);
    window_destroy(my_window);
}

int main(void) {
    init();
    app_event_loop();
    deinit();
}
