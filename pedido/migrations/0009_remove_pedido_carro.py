# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0008_auto_20150414_0442'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pedido',
            name='carro',
        ),
    ]
